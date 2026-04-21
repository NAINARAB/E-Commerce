"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productCreateSchema = exports.ProductMaster = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
const brands_model_1 = require("./brands.model");
const company_model_1 = require("../company/company.model");
const zod_1 = require("zod");
class ProductMaster extends sequelize_1.Model {
}
exports.ProductMaster = ProductMaster;
ProductMaster.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    product_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    product_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    short_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    product_description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    company_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    brand_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true
    },
    pack_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true
    },
    hsn_code: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    units: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    gst_p: {
        type: sequelize_1.DataTypes.DECIMAL(18, 2),
        allowNull: true,
        defaultValue: 0
    },
    cgst_p: {
        type: sequelize_1.DataTypes.DECIMAL(18, 2),
        allowNull: true,
        defaultValue: 0
    },
    sgst_p: {
        type: sequelize_1.DataTypes.DECIMAL(18, 2),
        allowNull: true,
        defaultValue: 0
    },
    igst_p: {
        type: sequelize_1.DataTypes.DECIMAL(18, 2),
        allowNull: true,
        defaultValue: 0
    },
    product_rate: {
        type: sequelize_1.DataTypes.DECIMAL(18, 2),
        allowNull: true,
        defaultValue: 0
    },
    max_rate: {
        type: sequelize_1.DataTypes.DECIMAL(18, 2),
        allowNull: true,
        defaultValue: 0
    },
    selling_rate: {
        type: sequelize_1.DataTypes.DECIMAL(18, 2),
        allowNull: true,
        defaultValue: 0
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    },
    erp_id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_products',
    modelName: 'ProductMaster',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});
ProductMaster.belongsTo(company_model_1.Company, { foreignKey: 'company_id', targetKey: 'id' });
ProductMaster.belongsTo(brands_model_1.Brand, { foreignKey: 'brand_id', targetKey: 'id' });
exports.productCreateSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    company_id: zod_1.z.string('Company id is required'),
    brand_id: zod_1.z.string('Brand id is required'),
    product_code: zod_1.z.string('Product code is required'),
    product_name: zod_1.z.string('Product name is required'),
    short_name: zod_1.z.string('Short name is required'),
    product_description: zod_1.z.string('Product description is required'),
    hsn_code: zod_1.z.string().optional().nullable(),
    units: zod_1.z.string().optional().nullable(),
    pack_id: zod_1.z.string(),
    gst_p: zod_1.z.number('GST percentage is required'),
    cgst_p: zod_1.z.number('CGST percentage is required'),
    sgst_p: zod_1.z.number('SGST percentage is required'),
    igst_p: zod_1.z.number('IGST percentage is required'),
    product_rate: zod_1.z.number('Product rate is required'),
    max_rate: zod_1.z.number('Max rate is required'),
    selling_rate: zod_1.z.number('Selling rate is required'),
    is_active: zod_1.z.boolean().optional(),
    erp_id: zod_1.z.string().optional().nullable(),
});
