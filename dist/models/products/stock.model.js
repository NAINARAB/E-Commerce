"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStockSchema = exports.ProductStock = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
const company_model_1 = require("../company/company.model");
const branch_model_1 = require("../company/branch.model");
const product_model_1 = require("./product.model");
const zod_1 = require("zod");
class ProductStock extends sequelize_1.Model {
}
exports.ProductStock = ProductStock;
ProductStock.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    company_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    shop_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    product_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    reserved_stock: {
        type: sequelize_1.DataTypes.DECIMAL(12, 3),
        allowNull: false,
        defaultValue: 0
    },
    available_stock: {
        type: sequelize_1.DataTypes.DECIMAL(12, 3),
        allowNull: false,
        defaultValue: 0
    },
    last_stock_sync_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_product_stock',
    modelName: 'ProductStock',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});
ProductStock.belongsTo(company_model_1.Company, { foreignKey: 'company_id', targetKey: 'id' });
ProductStock.belongsTo(branch_model_1.Shop, { foreignKey: 'shop_id', targetKey: 'id' });
ProductStock.belongsTo(product_model_1.ProductMaster, { foreignKey: 'product_id', targetKey: 'id' });
product_model_1.ProductMaster.hasMany(ProductStock, { foreignKey: 'product_id', as: 'stocks' });
exports.productStockSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    company_id: zod_1.z.string('Company id is required'),
    shop_id: zod_1.z.string('Shop id is required'),
    product_id: zod_1.z.string('Product id is required'),
    reserved_stock: zod_1.z.number('Reserved stock is required').default(0),
    available_stock: zod_1.z.number('Available stock is required'),
    last_stock_sync_at: zod_1.z.date().optional(),
});
