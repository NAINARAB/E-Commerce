"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationData = void 0;
const sequelize_1 = require("sequelize");
const paginationData = (searchFields = []) => {
    return (req, res, next) => {
        const search = req.query.search?.toString() || "";
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;
        const paginate = String(req.query.paginate || "false") === "true";
        const offset = (page - 1) * limit;
        let where = {};
        if (search && searchFields.length > 0) {
            where = {
                [sequelize_1.Op.or]: searchFields.map((field) => ({
                    [field]: { [sequelize_1.Op.like]: `%${search}%` },
                })),
            };
        }
        req.pagination = {
            page,
            limit,
            offset,
            paginate,
            search,
            where
        };
        next();
    };
};
exports.paginationData = paginationData;
