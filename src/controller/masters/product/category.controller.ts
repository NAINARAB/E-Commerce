import { Request, Response } from "express";
import { created, dataFound, deleted, invalidInput, notFound, sentData, servError, updated } from "../../../response";
import { validateBody } from "../../../middleware/zodValidator";
import { Category, categorySchema } from "../../../models/products/category.model";

export const getCategories = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await Category.findAndCountAll({
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

        const data = await Category.findAll({
            where,
            order: [['name', 'ASC']],
        });

        sentData(res, data);
    } catch (e) {
        servError(e, res);
    }
};

export const getCategoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const category = await Category.findByPk(id as string);
        if (!category) return notFound(res, 'Category not found');
        dataFound(res, [category]);
    } catch (e) {
        servError(e, res);
    }
};

export const createCategory = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(categorySchema, req.body, res);
        if (!validatedData) return;

        const newCategory = await Category.create(validatedData);

        created(res, newCategory);
    } catch (e) {
        servError(e, res);
    }
};

export const updateCategory = async (req: Request, res: Response) => {
    try {

        const validatedData = validateBody(categorySchema, req.body, res);
        if (!validatedData) return;

        const category = await Category.findByPk(validatedData.id);
        if (!category) return notFound(res, 'Category not found');

        await category.update(validatedData);

        updated(res, category);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const category = await Category.findByPk(id as string);
        if (!category) return notFound(res, 'Category not found');

        await category.update({ is_active: false });
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
}; 