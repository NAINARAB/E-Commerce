import { Request, Response } from "express";
import { validateBody } from "../../../middleware/zodValidator";
import { categoryMapSchema, ProductCategoryMap } from "../../../models/products/category.model";
import { created, servError } from "../../../response";

import { ProductImage, productImageSchema } from "../../../models/products/image.model";
import { ProductPrice, productPriceSchema } from "../../../models/products/price.model";
import { ProductStock, productStockSchema } from "../../../models/products/stock.model";
import { ProductVariant, productVariantSchema, ProductVariantValue } from "../../../models/products/variant.model";


export const addCategoryMap = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(categoryMapSchema, req.body, res);
        if (!validatedData) return;

        const newCategoryMap = await ProductCategoryMap.create(validatedData);

        created(res, newCategoryMap);
    } catch (e) {
        servError(e, res);
    }
};

export const addProductImage = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(productImageSchema, req.body, res);
        if (!validatedData) return;

        const newProductImage = await ProductImage.create(validatedData);

        created(res, newProductImage);
    } catch (e) {
        servError(e, res);
    }
};

export const addProductPrice = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(productPriceSchema, req.body, res);
        if (!validatedData) return;

        const newProductPrice = await ProductPrice.create(validatedData);

        created(res, newProductPrice);
    } catch (e) {
        servError(e, res);
    }
};

export const addProductStock = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(productStockSchema, req.body, res);
        if (!validatedData) return;

        const newProductStock = await ProductStock.create(validatedData);

        created(res, newProductStock);
    } catch (e) {
        servError(e, res);
    }
};

export const addProductVariant = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(productVariantSchema, req.body, res);
        if (!validatedData) return;

        const newProductVariant = await ProductVariant.create(validatedData);

        if (validatedData.product_data.length > 0) {
            const productData = validatedData.product_data.map((product_id: string) => ({
                product_id,
                variant_id: (newProductVariant.id as string),
            }));
            await ProductVariantValue.bulkCreate(productData);
        }

        created(res, newProductVariant);
    } catch (e) {
        servError(e, res);
    }
};
