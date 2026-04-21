"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productPriceSchema = exports.ProductPrice = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
const company_model_1 = require("../company/company.model");
const product_model_1 = require("./product.model");
const zod_1 = require("zod");
class ProductPrice extends sequelize_1.Model {
}
exports.ProductPrice = ProductPrice;
ProductPrice.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    company_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    product_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    mrp: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
    },
    selling_price: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
    },
    discount_amount: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        defaultValue: 0
    },
    discount_percentage: {
        type: sequelize_1.DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
    },
    effective_from: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    effective_to: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_product_price',
    modelName: 'ProductPrice',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
    indexes: [{ fields: ['company_id', 'product_id'] }]
});
ProductPrice.belongsTo(company_model_1.Company, { foreignKey: 'company_id', targetKey: 'id' });
ProductPrice.belongsTo(product_model_1.ProductMaster, { foreignKey: 'product_id', targetKey: 'id' });
product_model_1.ProductMaster.hasMany(ProductPrice, { foreignKey: 'product_id', as: 'prices' });
exports.productPriceSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    company_id: zod_1.z.string('Company id is required'),
    product_id: zod_1.z.string('Product id is required'),
    mrp: zod_1.z.number('Mrp is required'),
    selling_price: zod_1.z.number('Selling price is required'),
    discount_amount: zod_1.z.number('Discount amount is required').default(0),
    discount_percentage: zod_1.z.number('Discount percentage is required').default(0),
    effective_from: zod_1.z.date().optional(),
    effective_to: zod_1.z.date().optional(),
});
