"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBranch = exports.updateBranch = exports.createBranch = exports.getBranchById = exports.getAllBranches = void 0;
const response_1 = require("../../../response");
const zodValidator_1 = require("../../../middleware/zodValidator");
const branch_model_1 = require("../../../models/company/branch.model");
const company_model_1 = require("../../../models/company/company.model");
const getAllBranches = async (req, res) => {
    try {
        const { page, limit, offset, paginate, where } = req.pagination;
        if (paginate) {
            const { rows, count } = await branch_model_1.Shop.findAndCountAll({
                where,
                limit,
                offset,
                order: [['name', 'ASC']],
                // include: [
                //     {
                //         model: Company,
                //         attributes: ['id', 'name']
                //     }
                // ]
            });
            return (0, response_1.sentData)(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }
        const data = await branch_model_1.Shop.findAll({
            where,
            order: [['name', 'ASC']],
        });
        return (0, response_1.dataFound)(res, data);
    }
    catch (error) {
        return (0, response_1.servError)(res, error);
    }
};
exports.getAllBranches = getAllBranches;
const getBranchById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const branch = await branch_model_1.Shop.findByPk(id);
        if (!branch) {
            return (0, response_1.notFound)(res, 'Shop not found');
        }
        return (0, response_1.dataFound)(res, branch);
    }
    catch (error) {
        return (0, response_1.servError)(res, error);
    }
};
exports.getBranchById = getBranchById;
const createBranch = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(branch_model_1.shopSchema, req.body, res);
        if (!validatedData)
            return;
        const company = await company_model_1.Company.findByPk(validatedData.company_id);
        if (!company) {
            return (0, response_1.notFound)(res, 'Company not found');
        }
        const branch = await branch_model_1.Shop.create(validatedData);
        return (0, response_1.created)(res, branch);
    }
    catch (error) {
        return (0, response_1.servError)(res, error);
    }
};
exports.createBranch = createBranch;
const updateBranch = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(branch_model_1.shopSchema, req.body, res);
        if (!validatedData)
            return;
        const branch = await branch_model_1.Shop.findByPk(validatedData.id);
        if (!branch) {
            return (0, response_1.notFound)(res, 'Shop not found');
        }
        const company = await company_model_1.Company.findByPk(validatedData.company_id);
        if (!company) {
            return (0, response_1.notFound)(res, 'Company not found');
        }
        await branch.update(validatedData);
        return (0, response_1.updated)(res, branch);
    }
    catch (error) {
        return (0, response_1.servError)(res, error);
    }
};
exports.updateBranch = updateBranch;
const deleteBranch = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const branch = await branch_model_1.Shop.findByPk(id);
        if (!branch) {
            return (0, response_1.notFound)(res, 'Shop not found');
        }
        await branch.update({ is_active: false, updated_at: new Date() });
        return (0, response_1.deleted)(res, 'Shop deleted successfully');
    }
    catch (error) {
        return (0, response_1.servError)(res, error);
    }
};
exports.deleteBranch = deleteBranch;
