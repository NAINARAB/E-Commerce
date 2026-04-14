import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";
import { ProductMaster } from './product.model';

// --- Category ---
export interface CategoryAttributes {
    id?: string;
    parentId?: string | null;
    name: string;
    slug: string;
    isActive?: boolean | null;
    sortOrder?: number | null;
    erpId?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export interface ProductCategoryMapAttributes {
    id?: string;
    productId: string;
    categoryId: string;
    isPrimary?: boolean | null;
}

export type CategoryCreationAttributes = Optional<CategoryAttributes, 'id' | 'parentId' | 'isActive' | 'sortOrder' | 'erpId' | 'createdAt' | 'updatedAt'>;

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {}

export type ProductCategoryMapCreationAttributes = Optional<ProductCategoryMapAttributes, 'id' | 'isPrimary'>;

export class ProductCategoryMap extends Model<ProductCategoryMapAttributes, ProductCategoryMapCreationAttributes> {}

Category.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    parentId: { type: DataTypes.UUID, field: 'parent_id', allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, field: 'is_active', defaultValue: true },
    sortOrder: { type: DataTypes.INTEGER, field: 'sort_order', allowNull: true },
    erpId: { type: DataTypes.STRING, field: 'erp_id', allowNull: true },
    createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at', allowNull: true }
}, { sequelize, tableName: 'categories', modelName: 'Category', timestamps: false, freezeTableName: true });

export const categorySchema = z.object({
    parentId: z.string().optional().nullable(),
    name: z.string().min(1),
    slug: z.string().min(1),
    isActive: z.boolean().optional(),
    sortOrder: z.number().optional().nullable(),
    erpId: z.string().optional().nullable(),
});

ProductCategoryMap.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    productId: { type: DataTypes.UUID, field: 'product_id', allowNull: false },
    categoryId: { type: DataTypes.UUID, field: 'category_id', allowNull: false },
    isPrimary: { type: DataTypes.BOOLEAN, field: 'is_primary', defaultValue: false }
}, { sequelize, tableName: 'product_category_map', modelName: 'ProductCategoryMap', timestamps: false, freezeTableName: true });


Category.belongsTo(Category, { as: 'parent', foreignKey: 'parentId', targetKey: 'id' });
ProductCategoryMap.belongsTo(ProductMaster, { foreignKey: 'productId', targetKey: 'id' });
ProductCategoryMap.belongsTo(Category, { foreignKey: 'categoryId', targetKey: 'id' });


