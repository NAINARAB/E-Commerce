"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryMapSchema = exports.categorySchema = exports.ProductCategoryMap = exports.Category = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
const zod_1 = require("zod");
const product_model_1 = require("./product.model");
class Category extends sequelize_1.Model {
}
exports.Category = Category;
class ProductCategoryMap extends sequelize_1.Model {
}
exports.ProductCategoryMap = ProductCategoryMap;
Category.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    parent_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    },
    sort_order: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1
    },
    created_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        defaultValue: sequelize_1.DataTypes.NOW
    },
    updated_at: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
        defaultValue: sequelize_1.DataTypes.NOW
    }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_categories',
    modelName: 'Category',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});
ProductCategoryMap.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4
    },
    product_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    category_id: {
        type: sequelize_1.DataTypes.UUID,
        allowNull: false
    },
    is_primary: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false
    }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_product_category_map',
    modelName: 'ProductCategoryMap',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true
});
exports.categorySchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    parent_id: zod_1.z.string().optional().nullable(),
    name: zod_1.z.string('Category name is required'),
    sort_order: zod_1.z.number().optional(),
    description: zod_1.z.string('Category description is required'),
    is_active: zod_1.z.boolean().optional(),
});
exports.categoryMapSchema = zod_1.z.object({
    id: zod_1.z.string().optional(),
    product_id: zod_1.z.string('Product id is required'),
    category_id: zod_1.z.string('Category id is required'),
    is_primary: zod_1.z.boolean().optional(),
});
Category.belongsTo(Category, { as: 'parent', foreignKey: 'parent_id', targetKey: 'id' });
ProductCategoryMap.belongsTo(product_model_1.ProductMaster, { foreignKey: 'product_id', targetKey: 'id' });
ProductCategoryMap.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'id' });
product_model_1.ProductMaster.belongsToMany(Category, { through: ProductCategoryMap, foreignKey: 'product_id', otherKey: 'category_id', as: 'categories' });
Category.belongsToMany(product_model_1.ProductMaster, { through: ProductCategoryMap, foreignKey: 'category_id', otherKey: 'product_id', as: 'products' });
