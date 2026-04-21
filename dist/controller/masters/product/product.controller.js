"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.getProductById = exports.getProducts = void 0;
const response_1 = require("../../../response");
const zodValidator_1 = require("../../../middleware/zodValidator");
const product_model_1 = require("../../../models/products/product.model");
const product_model_2 = require("../../../models/products/product.model");
const price_model_1 = require("../../../models/products/price.model");
const stock_model_1 = require("../../../models/products/stock.model");
const category_model_1 = require("../../../models/products/category.model");
const brands_model_1 = require("../../../models/products/brands.model");
const getProducts = async (req, res) => {
    try {
        const { page, limit, offset, paginate, where } = req.pagination;
        const include = [
            {
                model: price_model_1.ProductPrice,
                as: 'prices',
                separate: true,
                order: [['created_at', 'DESC']]
            },
            {
                model: stock_model_1.ProductStock,
                as: 'stocks',
                separate: true,
                order: [['last_stock_sync_at', 'DESC']]
            },
            {
                model: category_model_1.Category,
                as: 'categories',
                attributes: ['id', 'name'],
                through: { attributes: [] }
            },
            {
                model: brands_model_1.Brand,
                attributes: ['id', 'name']
            }
        ];
        const formatData = (products) => {
            return products.map((p) => {
                const product = p.toJSON ? p.toJSON() : p;
                product.price = product.prices && product.prices.length > 0 ? product.prices[0] : null;
                product.stock = product.stocks && product.stocks.length > 0 ? product.stocks[0] : null;
                delete product.prices;
                delete product.stocks;
                if (product.Brand) {
                    product.brand = product.Brand;
                    delete product.Brand;
                }
                return product;
            });
        };
        if (paginate) {
            const { rows, count } = await product_model_1.ProductMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [['product_name', 'ASC']],
                include,
                distinct: true
            });
            return (0, response_1.sentData)(res, formatData(rows), {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }
        const data = await product_model_1.ProductMaster.findAll({
            where,
            order: [['product_name', 'ASC']],
            include
        });
        (0, response_1.sentData)(res, formatData(data));
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.getProducts = getProducts;
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const product = await product_model_1.ProductMaster.findByPk(id);
        if (!product)
            return (0, response_1.notFound)(res, 'Product not found');
        (0, response_1.dataFound)(res, [product]);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.getProductById = getProductById;
const createProduct = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(product_model_2.productCreateSchema, req.body, res);
        if (!validatedData)
            return;
        const newProduct = await product_model_1.ProductMaster.create(validatedData);
        (0, response_1.created)(res, newProduct);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.createProduct = createProduct;
const updateProduct = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(product_model_2.productCreateSchema, req.body, res);
        if (!validatedData)
            return;
        const product = await product_model_1.ProductMaster.findByPk(validatedData.id);
        if (!product)
            return (0, response_1.notFound)(res, 'Product not found');
        await product.update(validatedData);
        (0, response_1.updated)(res, product);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.updateProduct = updateProduct;
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const product = await product_model_1.ProductMaster.findByPk(id);
        if (!product)
            return (0, response_1.notFound)(res, 'Product not found');
        await product.update({ is_active: false });
        (0, response_1.deleted)(res);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.deleteProduct = deleteProduct;
