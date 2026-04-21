"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shopSchema = exports.Shop = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
const zod_1 = require("zod");
const company_model_1 = require("./company.model");
class Shop extends sequelize_1.Model {
}
exports.Shop = Shop;
Shop.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    company_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    erp_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_shops',
    modelName: 'Shop',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});
Shop.belongsTo(company_model_1.Company, { foreignKey: 'company_id', targetKey: 'id' });
exports.shopSchema = zod_1.z.object({
    company_id: zod_1.z.string(),
    code: zod_1.z.string().min(1),
    name: zod_1.z.string().min(1),
    erp_id: zod_1.z.string().optional().nullable(),
});
