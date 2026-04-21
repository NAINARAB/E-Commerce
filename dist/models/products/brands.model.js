"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandSchema = exports.Brand = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
const zod_1 = require("zod");
const company_model_1 = require("../company/company.model");
class Brand extends sequelize_1.Model {
}
exports.Brand = Brand;
Brand.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    company_id: {
        type: sequelize_1.DataTypes.UUID,
        field: 'company_id',
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        field: 'is_active',
        defaultValue: true
    },
    erp_id: {
        type: sequelize_1.DataTypes.STRING,
        field: 'erp_id',
        allowNull: true
    }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_brands',
    modelName: 'Brand',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});
exports.brandSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    company_id: zod_1.z.string('Company id is required'),
    name: zod_1.z.string('Name is required').min(1),
    is_active: zod_1.z.boolean().optional(),
    erp_id: zod_1.z.string().optional().nullable(),
});
Brand.belongsTo(company_model_1.Company, { foreignKey: 'company_id', targetKey: 'id' });
