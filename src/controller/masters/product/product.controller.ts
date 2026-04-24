import { Request, Response } from "express";
import { created, dataFound, deleted, invalidInput, notFound, sentData, servError, updated } from "../../../response";
import { validateBody } from "../../../middleware/zodValidator";
import { ProductMaster } from "../../../models/products/product.model";
import { productCreateSchema } from "../../../models/products/product.model";
import { ProductPrice } from "../../../models/products/price.model";
import { ProductStock } from "../../../models/products/stock.model";
import { Category } from "../../../models/products/category.model";
import { Brand } from "../../../models/products/brands.model";

export const productJoins: any = [
    {
        model: ProductPrice,
        as: 'prices',
        // separate: true,
        attributes: ['mrp', 'selling_price', 'discount_amount', 'discount_percentage', 'effective_from', 'effective_to'],
        order: [['created_at', 'DESC']]
    },
    {
        model: ProductStock,
        as: 'stocks',
        // separate: true,
        attributes: ['shop_id', 'reserved_stock', 'available_stock', 'last_stock_sync_at'],
        order: [['last_stock_sync_at', 'DESC']]
    },
    {
        model: Category,
        as: 'categories',
        attributes: ['id', 'name'],
        through: { attributes: [] }
    },
    {
        model: Brand,
        attributes: ['id', 'name']
    }
];

export const formatProductsData = (products: any[]) => {
    return products.map((p) => {
        const product = p.toJSON ? p.toJSON() : p;
        product.price = product.prices && product.prices.length > 0 ? product.prices[0] : null;
        delete product.prices;
        if (product.Brand) {
            product.brand = product.Brand;
            delete product.Brand;
        }
        return product;
    });
};

export const getProducts = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await ProductMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [['product_name', 'ASC']],
                include: productJoins,
                distinct: true
            });

            return sentData(res, formatProductsData(rows), {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await ProductMaster.findAll({
            where,
            order: [['product_name', 'ASC']],
            include: productJoins
        });

        sentData(res, formatProductsData(data));
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