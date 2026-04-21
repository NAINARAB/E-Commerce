"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.productImageSchema = exports.ProductImage = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
const product_model_1 = require("./product.model");
const zod_1 = require("zod");
class ProductImage extends sequelize_1.Model {
}
exports.ProductImage = ProductImage;
ProductImage.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    product_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    image_path: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    is_primary: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    },
    sort_order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: sequalizer_1.sequelize,
    modelName: 'ProductImage',
    tableName: 'tbl_product_images',
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});
ProductImage.belongsTo(product_model_1.ProductMaster, { foreignKey: 'product_id', targetKey: 'id' });
exports.productImageSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    product_id: zod_1.z.string('Product id is required'),
    image_path: zod_1.z.string('Image path is required'),
    image_name: zod_1.z.string('Image name is required'),
    image_url: zod_1.z.string('Image url is required').optional(),
    is_primary: zod_1.z.boolean().optional().default(false),
    sort_order: zod_1.z.number().optional().default(1),
});
