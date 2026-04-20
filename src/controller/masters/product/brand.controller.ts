import { Request, Response } from "express";
import { created, dataFound, deleted, invalidInput, notFound, sentData, servError, updated } from "../../../response";
import { validateBody } from "../../../middleware/zodValidator";
import { Brand, brandSchema } from "../../../models/products/brands.modes";


export const getBrands = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await Brand.findAndCountAll({
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

        const data = await Brand.findAll({
            where,
            order: [['name', 'ASC']],
        });

        sentData(res, data);
    } catch (e) {
        servError(e, res);
    }
};

export const getBrandById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const brand = await Brand.findByPk(id as string);
        if (!brand) return notFound(res, 'Brand not found');
        dataFound(res, [brand]);
    } catch (e) {
        servError(e, res);
    }
};

export const createBrand = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(brandSchema, req.body, res);
        if (!validatedData) return;

        const newBrand = await Brand.create(validatedData);

        created(res, newBrand);
    } catch (e) {
        servError(e, res);
    }
};

export const updateBrand = async (req: Request, res: Response) => {
    try {

        const validatedData = validateBody(brandSchema, req.body, res);
        if (!validatedData) return;

        const brand = await Brand.findByPk(validatedData.id);
        if (!brand) return notFound(res, 'Brand not found');

        await brand.update(validatedData);

        updated(res, brand);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteBrand = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const brand = await Brand.findByPk(id as string);
        if (!brand) return notFound(res, 'Brand not found');

        await brand.update({ is_active: false });
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};