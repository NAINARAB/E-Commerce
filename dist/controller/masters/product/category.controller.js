"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.createCategory = exports.getCategoryById = exports.getCategories = void 0;
const response_1 = require("../../../response");
const zodValidator_1 = require("../../../middleware/zodValidator");
const category_model_1 = require("../../../models/products/category.model");
const getCategories = async (req, res) => {
    try {
        const { page, limit, offset, paginate, where } = req.pagination;
        if (paginate) {
            const { rows, count } = await category_model_1.Category.findAndCountAll({
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
        const data = await category_model_1.Category.findAll({
            where,
            order: [['name', 'ASC']],
        });
        (0, response_1.sentData)(res, data);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.getCategories = getCategories;
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const category = await category_model_1.Category.findByPk(id);
        if (!category)
            return (0, response_1.notFound)(res, 'Category not found');
        (0, response_1.dataFound)(res, [category]);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.getCategoryById = getCategoryById;
const createCategory = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(category_model_1.categorySchema, req.body, res);
        if (!validatedData)
            return;
        const newCategory = await category_model_1.Category.create(validatedData);
        (0, response_1.created)(res, newCategory);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.createCategory = createCategory;
const updateCategory = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(category_model_1.categorySchema, req.body, res);
        if (!validatedData)
            return;
        const category = await category_model_1.Category.findByPk(validatedData.id);
        if (!category)
            return (0, response_1.notFound)(res, 'Category not found');
        await category.update(validatedData);
        (0, response_1.updated)(res, category);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.updateCategory = updateCategory;
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const category = await category_model_1.Category.findByPk(id);
        if (!category)
            return (0, response_1.notFound)(res, 'Category not found');
        await category.update({ is_active: false });
        (0, response_1.deleted)(res);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.deleteCategory = deleteCategory;
