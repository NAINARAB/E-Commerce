"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductVariant = exports.addProductStock = exports.addProductPrice = exports.addProductImage = exports.addCategoryMap = void 0;
const zodValidator_1 = require("../../../middleware/zodValidator");
const category_model_1 = require("../../../models/products/category.model");
const response_1 = require("../../../response");
const image_model_1 = require("../../../models/products/image.model");
const price_model_1 = require("../../../models/products/price.model");
const stock_model_1 = require("../../../models/products/stock.model");
const variant_model_1 = require("../../../models/products/variant.model");
const addCategoryMap = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(category_model_1.categoryMapSchema, req.body, res);
        if (!validatedData)
            return;
        const newCategoryMap = await category_model_1.ProductCategoryMap.create(validatedData);
        (0, response_1.created)(res, newCategoryMap);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.addCategoryMap = addCategoryMap;
const addProductImage = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(image_model_1.productImageSchema, req.body, res);
        if (!validatedData)
            return;
        const newProductImage = await image_model_1.ProductImage.create(validatedData);
        (0, response_1.created)(res, newProductImage);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.addProductImage = addProductImage;
const addProductPrice = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(price_model_1.productPriceSchema, req.body, res);
        if (!validatedData)
            return;
        const newProductPrice = await price_model_1.ProductPrice.create(validatedData);
        (0, response_1.created)(res, newProductPrice);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.addProductPrice = addProductPrice;
const addProductStock = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(stock_model_1.productStockSchema, req.body, res);
        if (!validatedData)
            return;
        const newProductStock = await stock_model_1.ProductStock.create(validatedData);
        (0, response_1.created)(res, newProductStock);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.addProductStock = addProductStock;
const addProductVariant = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(variant_model_1.productVariantSchema, req.body, res);
        if (!validatedData)
            return;
        const newProductVariant = await variant_model_1.ProductVariant.create(validatedData);
        if (validatedData.product_data.length > 0) {
            const productData = validatedData.product_data.map((product_id) => ({
                product_id,
                variant_id: newProductVariant.id,
            }));
            await variant_model_1.ProductVariantValue.bulkCreate(productData);
        }
        (0, response_1.created)(res, newProductVariant);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.addProductVariant = addProductVariant;
