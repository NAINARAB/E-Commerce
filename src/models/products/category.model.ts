import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";
import { ProductMaster } from './product.model';

// --- Category ---
export interface CategoryAttributes {
    id?: string;
    parent_id?: string | null;
    name: string;
    description: string;
    is_active: boolean;
    sort_order: number;
    created_at?: Date | null;
    updated_at?: Date | null;
}

// product category map
export interface ProductCategoryMapAttributes {
    id?: string;
    product_id: string;
    category_id: string;
    is_primary?: boolean | null;
}

export type CategoryCreationAttributes = Optional<CategoryAttributes, 'id' | 'parent_id' | 'is_active' | 'sort_order' | 'created_at' | 'updated_at'>;

export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> {}

export type ProductCategoryMapCreationAttributes = Optional<ProductCategoryMapAttributes, 'id' | 'is_primary'>;

export class ProductCategoryMap extends Model<ProductCategoryMapAttributes, ProductCategoryMapCreationAttributes> {}

Category.init({
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    parent_id: { 
        type: DataTypes.UUID, 
        allowNull: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    description: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: true 
    },
    sort_order: { 
        type: DataTypes.INTEGER, 
        allowNull: true,
        defaultValue: 1 
    },
    created_at: { 
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW 
    },
    updated_at: { 
        type: DataTypes.DATE, 
        allowNull: true, 
        defaultValue: DataTypes.NOW 
    }
}, { 
    sequelize, 
    tableName: 'tbl_categories', 
    modelName: 'Category', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    freezeTableName: true 
});

ProductCategoryMap.init({
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    product_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    category_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    is_primary: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: false 
    }
}, { 
    sequelize, 
    tableName: 'tbl_product_category_map', 
    modelName: 'ProductCategoryMap', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    freezeTableName: true 
});

export const categorySchema = z.object({
    id: z.string().optional(),
    parent_id: z.string().optional().nullable(),
    name: z.string('Category name is required'),
    sort_order: z.number().optional(),
    description: z.string('Category description is required'),
    is_active: z.boolean().optional(),
});

export const categoryMapSchema = z.object({
    id: z.string().optional(),
    product_id: z.string('Product id is required'),
    category_id: z.string('Category id is required'),
    is_primary: z.boolean().optional(),
});


Category.belongsTo(Category, { as: 'parent', foreignKey: 'parent_id', targetKey: 'id' });
ProductCategoryMap.belongsTo(ProductMaster, { foreignKey: 'product_id', targetKey: 'id' });
ProductCategoryMap.belongsTo(Category, { foreignKey: 'category_id', targetKey: 'id' });


