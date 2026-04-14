import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { ProductMaster } from './product.model';
import { ProductVariant } from './variant.model';

export interface ProductImageAttributes {
    id?: string;
    productId: string;
    variantId?: string | null;
    imageUrl: string;
    isPrimary?: boolean | null;
    sortOrder?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export type ProductImageCreationAttributes = Optional<ProductImageAttributes, 'id' | 'variantId' | 'isPrimary' | 'sortOrder' | 'createdAt' | 'updatedAt'>;
export class ProductImage extends Model<ProductImageAttributes, ProductImageCreationAttributes> {}

ProductImage.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    productId: { type: DataTypes.UUID, field: 'product_id', allowNull: false },
    variantId: { type: DataTypes.UUID, field: 'variant_id', allowNull: true },
    imageUrl: { type: DataTypes.STRING, field: 'image_url', allowNull: false },
    isPrimary: { type: DataTypes.BOOLEAN, field: 'is_primary', defaultValue: false },
    sortOrder: { type: DataTypes.INTEGER, field: 'sort_order', defaultValue: 0 },
    createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at', allowNull: true }
}, { sequelize, tableName: 'product_images', modelName: 'ProductImage', timestamps: false, freezeTableName: true });

ProductImage.belongsTo(ProductMaster, { foreignKey: 'productId', targetKey: 'id' });
ProductImage.belongsTo(ProductVariant, { foreignKey: 'variantId', targetKey: 'id' });