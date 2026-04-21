"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCompany = exports.updateCompany = exports.createCompany = exports.getCompanyById = exports.getAllCompanies = void 0;
const response_1 = require("../../../response");
const zodValidator_1 = require("../../../middleware/zodValidator");
const company_model_1 = require("../../../models/company/company.model");
const getAllCompanies = async (req, res) => {
    try {
        const { page, limit, offset, paginate, where } = req.pagination;
        if (paginate) {
            const { rows, count } = await company_model_1.Company.findAndCountAll({
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
        const data = await company_model_1.Company.findAll({
            where,
            order: [['name', 'ASC']],
        });
        return (0, response_1.dataFound)(res, data);
    }
    catch (error) {
        return (0, response_1.servError)(res, error);
    }
};
exports.getAllCompanies = getAllCompanies;
const getCompanyById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const company = await company_model_1.Company.findByPk(id);
        if (!company) {
            return (0, response_1.notFound)(res, 'Company not found');
        }
        return (0, response_1.dataFound)(res, company);
    }
    catch (error) {
        return (0, response_1.servError)(res, error);
    }
};
exports.getCompanyById = getCompanyById;
const createCompany = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(company_model_1.companySchema, req.body, res);
        if (!validatedData)
            return;
        const company = await company_model_1.Company.create(validatedData);
        return (0, response_1.created)(res, company);
    }
    catch (error) {
        return (0, response_1.servError)(res, error);
    }
};
exports.createCompany = createCompany;
const updateCompany = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(company_model_1.companySchema, req.body, res);
        if (!validatedData)
            return;
        const company = await company_model_1.Company.findByPk(validatedData.id);
        if (!company) {
            return (0, response_1.notFound)(res, 'Company not found');
        }
        await company.update(validatedData);
        return (0, response_1.updated)(res, company);
    }
    catch (error) {
        return (0, response_1.servError)(res, error);
    }
};
exports.updateCompany = updateCompany;
const deleteCompany = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const company = await company_model_1.Company.findByPk(id);
        if (!company) {
            return (0, response_1.notFound)(res, 'Company not found');
        }
        await company.update({ is_active: false, updated_at: new Date() });
        return (0, response_1.deleted)(res, 'Company deleted successfully');
    }
    catch (error) {
        return (0, response_1.servError)(res, error);
    }
};
exports.deleteCompany = deleteCompany;
