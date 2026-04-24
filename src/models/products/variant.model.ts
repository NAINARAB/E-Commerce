import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { ProductMaster } from './product.model';
import { z } from 'zod';

// --- ProductVariant ---
export interface ProductVariants {
    id: string;
    variantName: string;
    is_active: boolean;
    created_at?: Date | null;
    updated_at?: Date | null;
}

export interface ProductVariantValues {
    id: string;
    variant_id: string;
    product_id: string;
    created_at?: Date | null;
    updated_at?: Date | null;
}

export type ProductVariantCreationAttributes = Optional<ProductVariants, 'id' | 'is_active'>;

export class ProductVariant extends Model<ProductVariants, ProductVariantCreationAttributes> implements ProductVariants {
    declare id: string;
    declare variantName: string;
    declare is_active: boolean;
    declare created_at?: Date | null;
    declare updated_at?: Date | null;
}

export type ProductVariantValueCreationAttributes = Optional<ProductVariantValues, 'id'>;

export class ProductVariantValue extends Model<ProductVariantValues, ProductVariantValueCreationAttributes> implements ProductVariantValues {
    declare id: string;
    declare variant_id: string;
    declare product_id: string;
    declare created_at?: Date | null;
    declare updated_at?: Date | null;
}

ProductVariant.init({
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    variantName: { 
        type: DataTypes.STRING, 
        field: 'variant_name', 
        allowNull: false 
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        field: 'is_active', 
        defaultValue: true 
    },
}, { 
    sequelize, 
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
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    product_id: { 
        type: DataTypes.UUID, 
        field: 'product_id', 
        allowNull: false,
        references: { model: ProductMaster }, 
        onDelete: 'CASCADE', 
        onUpdate: 'NO ACTION' 
    },
    variant_id: { 
        type: DataTypes.UUID, 
        field: 'variant_id', 
        allowNull: false,
        references: { model: ProductVariant }, 
        onDelete: 'CASCADE', 
        onUpdate: 'NO ACTION' 
    },
}, { 
    sequelize, 
    tableName: 'tbl_product_variant_values', 
    modelName: 'ProductVariantValue', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    freezeTableName: true,
});

ProductVariant.hasMany(ProductVariantValue, { foreignKey: 'variant_id' });
ProductVariantValue.belongsTo(ProductVariant, { foreignKey: 'variant_id' });
ProductVariantValue.belongsTo(ProductMaster, { foreignKey: 'product_id' });

export const productVariantSchema = z.object({
    id: z.string().optional(),
    variantName: z.string('Variant name is required'),
    is_active: z.boolean('Is active is required').default(true),
    product_data: z.array(z.string()).min(1, 'Product data is required'),
});

export const productVariantValueSchema = z.object({
    id: z.string().optional(),
    product_id: z.string('Product id is required'),
    variant_id: z.string('Variant id is required'),
});