"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.companySchema = exports.Company = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
const zod_1 = require("zod");
class Company extends sequelize_1.Model {
}
exports.Company = Company;
Company.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true
    },
    erp_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_companies',
    modelName: 'Company',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
});
// Company.hasMany(Shop, {
//     foreignKey: 'company_id',
//     as: 'shops' 
// })
exports.companySchema = zod_1.z.object({
    code: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    erp_id: zod_1.z.string().optional().nullable(),
});
