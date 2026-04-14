import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { Attribute, AttributeValue } from './attributes.model';
import { ProductMaster } from './product.model';

// --- ProductVariant ---
export interface ProductVariantAttributes {
    id?: string;
    productId: string;
    sku: string;
    variantName: string;
    barcode?: string | null;
    mrp?: number | null;
    salePrice?: number | null;
    isDefault?: boolean | null;
    isActive?: boolean | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export type ProductVariantCreationAttributes = Optional<ProductVariantAttributes, 'id' | 'barcode' | 'mrp' | 'salePrice' | 'isDefault' | 'isActive' | 'createdAt' | 'updatedAt'>;

export class ProductVariant extends Model<ProductVariantAttributes, ProductVariantCreationAttributes> {}

ProductVariant.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    productId: { type: DataTypes.UUID, field: 'product_id', allowNull: false },
    sku: { type: DataTypes.STRING, allowNull: false, unique: true },
    variantName: { type: DataTypes.STRING, field: 'variant_name', allowNull: false },
    barcode: { type: DataTypes.STRING, allowNull: true },
    mrp: { type: DataTypes.DECIMAL, allowNull: true },
    salePrice: { type: DataTypes.DECIMAL, field: 'sale_price', allowNull: true },
    isDefault: { type: DataTypes.BOOLEAN, field: 'is_default', defaultValue: false },
    isActive: { type: DataTypes.BOOLEAN, field: 'is_active', defaultValue: true },
    createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at', allowNull: true }
}, { sequelize, tableName: 'product_variants', modelName: 'ProductVariant', timestamps: false, freezeTableName: true });

// --- ProductVariantAttribute ---
export interface ProductVariantAttributeAttributes {
    id?: string;
    variantId: string;
    attributeId: string;
    attributeValueId: string;
}

export type ProductVariantAttributeCreationAttributes = Optional<ProductVariantAttributeAttributes, 'id'>;

export class ProductVariantAttribute extends Model<ProductVariantAttributeAttributes, ProductVariantAttributeCreationAttributes> {}

ProductVariantAttribute.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    variantId: { type: DataTypes.UUID, field: 'variant_id', allowNull: false },
    attributeId: { type: DataTypes.UUID, field: 'attribute_id', allowNull: false },
    attributeValueId: { type: DataTypes.UUID, field: 'attribute_value_id', allowNull: false }
}, { sequelize, tableName: 'product_variant_attributes', modelName: 'ProductVariantAttribute', timestamps: false, freezeTableName: true });


ProductVariant.belongsTo(ProductMaster, { foreignKey: 'productId', targetKey: 'id' });
ProductVariantAttribute.belongsTo(ProductVariant, { foreignKey: 'variantId', targetKey: 'id' });
ProductVariantAttribute.belongsTo(Attribute, { foreignKey: 'attributeId', targetKey: 'id' });
ProductVariantAttribute.belongsTo(AttributeValue, { foreignKey: 'attributeValueId', targetKey: 'id' });