import { Request, Response } from "express";
import { created, dataFound, deleted, invalidInput, notFound, sentData, servError, updated } from "../../../response";
import { validateBody } from "../../../middleware/zodValidator";
import { ProductMaster } from "../../../models/products/product.model";
import { productCreateSchema } from "../../../models/products/product.model";


export const getProducts = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await ProductMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [['product_name', 'ASC']],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await ProductMaster.findAll({
            where,
            order: [['product_name', 'ASC']],
        });

        sentData(res, data);
    } catch (e) {
        servError(e, res);
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const product = await ProductMaster.findByPk(id as string);
        if (!product) return notFound(res, 'Product not found');
        dataFound(res, [product]);
    } catch (e) {
        servError(e, res);
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(productCreateSchema, req.body, res);
        if (!validatedData) return;

        const newProduct = await ProductMaster.create(validatedData);

        created(res, newProduct);
    } catch (e) {
        servError(e, res);
    }
};

export const updateProduct = async (req: Request, res: Response) => {
    try {

        const validatedData = validateBody(productCreateSchema, req.body, res);
        if (!validatedData) return;

        const product = await ProductMaster.findByPk(validatedData.id);
        if (!product) return notFound(res, 'Product not found');

        await product.update(validatedData);

        updated(res, product);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const product = await ProductMaster.findByPk(id as string);
        if (!product) return notFound(res, 'Product not found');

        await product.update({ is_active: false });
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};