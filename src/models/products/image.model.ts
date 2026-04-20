import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { ProductMaster } from './product.model';
import { z } from 'zod';

export interface ProductImageAttributes {
    id?: string;
    product_id: string;
    image_path: string;
    image_name: string;
    image_url?: string;
    is_primary: boolean;
    sort_order?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
}

export type ProductImageCreationAttributes = Optional<ProductImageAttributes, 'id' | 'image_url' | 'sort_order' | 'created_at' | 'updated_at'>;
export class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> {}

ProductImage.init({
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    product_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    image_path: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    image_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    image_url: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    is_primary: { 
        type: DataTypes.BOOLEAN, 
        allowNull: false,
        defaultValue: false 
    },
    sort_order: { 
        type: DataTypes.INTEGER, 
        allowNull: false,
        defaultValue: 1
    },
    created_at: { 
        type: DataTypes.DATE, 
        defaultValue: DataTypes.NOW 
    },
    updated_at: { 
        type: DataTypes.DATE, 
        allowNull: true 
    }
}, { 
    sequelize, 
    modelName: 'ProductImage', 
    tableName: 'tbl_product_images', 
    freezeTableName: true, 
    timestamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at',
});

ProductImage.belongsTo(ProductMaster, { foreignKey: 'product_id', targetKey: 'id' });

export const productImageSchema = z.object({
    id: z.string().optional(),
    product_id: z.string('Product id is required'),
    image_path: z.string('Image path is required'),
    image_name: z.string('Image name is required'),
    image_url: z.string('Image url is required').optional(),
    is_primary: z.boolean().optional().default(false),
    sort_order: z.number().optional().default(1),
});