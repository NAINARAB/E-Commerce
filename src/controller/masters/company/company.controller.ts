import { Request, Response } from "express";
import { created, dataFound, deleted, invalidInput, notFound, sentData, servError, updated } from "../../../response";
import { validateBody } from "../../../middleware/zodValidator";
import { Company, companySchema } from "../../../models/company/company.model";

export const getAllCompanies = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await Company.findAndCountAll({
                where,
                limit,
                offset,
                order: [['name', 'ASC']],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await Company.findAll({
            where,
            order: [['name', 'ASC']],
        });

        return dataFound(res, data);

    } catch (error: any) {
        return servError(res, error);
    }
};

export const getCompanyById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const company = await Company.findByPk(id as string);
        if (!company) {
            return notFound(res, 'Company not found');
        }

        return dataFound(res, company as any);
    } catch (error: any) {
        return servError(res, error);
    }
};

export const createCompany = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(companySchema, req.body, res);
        if (!validatedData) return;

        const company = await Company.create(validatedData);

        return created(res, company);
    } catch (error: any) {
        return servError(res, error);
    }
};

export const updateCompany = async (req: Request, res: Response) => {
    try {
        const validatedData: Company | any = validateBody(companySchema, req.body, res);
        if (!validatedData) return;

        const company = await Company.findByPk(validatedData.id as string);
        if (!company) {
            return notFound(res, 'Company not found');
        }

        await company.update(validatedData);
        return updated(res, company);

    } catch (error: any) {
        return servError(res, error);
    }
};

export const deleteCompany = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const company = await Company.findByPk(id as string);
        if (!company) {
            return notFound(res, 'Company not found');
        }

        await company.update({ is_active: false, updated_at: new Date() });
        return deleted(res, 'Company deleted successfully');
    } catch (error: any) {
        return servError(res, error);
    }
};