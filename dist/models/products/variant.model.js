"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productVariantValueSchema = exports.productVariantSchema = exports.ProductVariantValue = exports.ProductVariant = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
const product_model_1 = require("./product.model");
const zod_1 = require("zod");
class ProductVariant extends sequelize_1.Model {
}
exports.ProductVariant = ProductVariant;
class ProductVariantValue extends sequelize_1.Model {
}
exports.ProductVariantValue = ProductVariantValue;
ProductVariant.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    variantName: {
        type: sequelize_1.DataTypes.STRING,
        field: 'variant_name',
        allowNull: false
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        field: 'is_active',
        defaultValue: true
    },
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_product_variants',
    modelName: 'ProductVariant',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
    indexes: [
        {
            unique: true,
            fields: ['variant_name'],
        },
    ],
});
ProductVariantValue.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    product_id: {
        type: sequelize_1.DataTypes.UUID,
        field: 'product_id',
        allowNull: false
    },
    variant_id: {
        type: sequelize_1.DataTypes.UUID,
        field: 'variant_id',
        allowNull: false
    },
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_product_variant_values',
    modelName: 'ProductVariantValue',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
});
ProductVariant.hasMany(ProductVariantValue, { foreignKey: 'variant_id' });
ProductVariantValue.belongsTo(ProductVariant, { foreignKey: 'variant_id' });
ProductVariantValue.belongsTo(product_model_1.ProductMaster, { foreignKey: 'product_id' });
exports.productVariantSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    variantName: zod_1.z.string('Variant name is required'),
    is_active: zod_1.z.boolean('Is active is required').default(true),
    product_data: zod_1.z.array(zod_1.z.string()).min(1, 'Product data is required'),
});
exports.productVariantValueSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    product_id: zod_1.z.string('Product id is required'),
    variant_id: zod_1.z.string('Variant id is required'),
});
