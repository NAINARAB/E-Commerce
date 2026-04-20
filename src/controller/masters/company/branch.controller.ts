import { Request, Response } from "express";
import { created, dataFound, deleted, invalidInput, notFound, sentData, servError, updated } from "../../../response";
import { validateBody } from "../../../middleware/zodValidator";
import { Shop, shopSchema } from "../../../models/company/branch.model";
import { Company } from "../../../models/company/company.model";

export const getAllBranches = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await Shop.findAndCountAll({
                where,
                limit,
                offset,
                order: [['name', 'ASC']],
                // include: [
                //     {
                //         model: Company,
                //         attributes: ['id', 'name']
                //     }
                // ]
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await Shop.findAll({
            where,
            order: [['name', 'ASC']],
        });

        return dataFound(res, data);

    } catch (error: any) {
        return servError(res, error);
    }
};

export const getBranchById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const branch = await Shop.findByPk(id as string);
        if (!branch) {
            return notFound(res, 'Shop not found');
        }

        return dataFound(res, branch as any);
    } catch (error: any) {
        return servError(res, error);
    }
};

export const createBranch = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(shopSchema, req.body, res);
        if (!validatedData) return;

        const company = await Company.findByPk(validatedData.company_id as string);
        if (!company) {
            return notFound(res, 'Company not found');
        }

        const branch = await Shop.create(validatedData);

        return created(res, branch);
    } catch (error: any) {
        return servError(res, error);
    }
};

export const updateBranch = async (req: Request, res: Response) => {
    try {
        const validatedData: Shop | any = validateBody(shopSchema, req.body, res);
        if (!validatedData) return;

        const branch = await Shop.findByPk(validatedData.id as string);
        if (!branch) {
            return notFound(res, 'Shop not found');
        }

        const company = await Company.findByPk(validatedData.company_id);
        if (!company) {
            return notFound(res, 'Company not found');
        }

        await branch.update(validatedData);
        return updated(res, branch);

    } catch (error: any) {
        return servError(res, error);
    }
};

export const deleteBranch = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const branch = await Shop.findByPk(id as string);
        if (!branch) {
            return notFound(res, 'Shop not found');
        }

        await branch.update({ is_active: false, updated_at: new Date() });
        return deleted(res, 'Shop deleted successfully');
    } catch (error: any) {
        return servError(res, error);
    }
};