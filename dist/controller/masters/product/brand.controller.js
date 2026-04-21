"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBrand = exports.updateBrand = exports.createBrand = exports.getBrandById = exports.getBrands = void 0;
const response_1 = require("../../../response");
const zodValidator_1 = require("../../../middleware/zodValidator");
const brands_model_1 = require("../../../models/products/brands.model");
const getBrands = async (req, res) => {
    try {
        const { page, limit, offset, paginate, where } = req.pagination;
        if (paginate) {
            const { rows, count } = await brands_model_1.Brand.findAndCountAll({
                where,
                limit,
                offset,
                order: [['name', 'ASC']],
            });
            return (0, response_1.sentData)(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }
        const data = await brands_model_1.Brand.findAll({
            where,
            order: [['name', 'ASC']],
        });
        (0, response_1.sentData)(res, data);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.getBrands = getBrands;
const getBrandById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const brand = await brands_model_1.Brand.findByPk(id);
        if (!brand)
            return (0, response_1.notFound)(res, 'Brand not found');
        (0, response_1.dataFound)(res, [brand]);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.getBrandById = getBrandById;
const createBrand = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(brands_model_1.brandSchema, req.body, res);
        if (!validatedData)
            return;
        const newBrand = await brands_model_1.Brand.create(validatedData);
        (0, response_1.created)(res, newBrand);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.createBrand = createBrand;
const updateBrand = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(brands_model_1.brandSchema, req.body, res);
        if (!validatedData)
            return;
        const brand = await brands_model_1.Brand.findByPk(validatedData.id);
        if (!brand)
            return (0, response_1.notFound)(res, 'Brand not found');
        await brand.update(validatedData);
        (0, response_1.updated)(res, brand);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.updateBrand = updateBrand;
const deleteBrand = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const brand = await brands_model_1.Brand.findByPk(id);
        if (!brand)
            return (0, response_1.notFound)(res, 'Brand not found');
        await brand.update({ is_active: false });
        (0, response_1.deleted)(res);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.deleteBrand = deleteBrand;
