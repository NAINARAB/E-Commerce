import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";

import { Company } from "../company/company.model";
import { Shop } from "../company/shop.model";
import { ProductMaster } from "./product.model";
import { ProductVariant } from "./variant.model";

// --- ProductPrice ---
export interface ProductPriceAttributes {
    id?: string;
    companyId: string;
    shopId?: string | null;
    productId: string;
    variantId?: string | null;
    mrp: number;
    sellingPrice: number;
    discountAmount?: number | null;
    taxAmount?: number | null;
    effectiveFrom?: Date | null;
    effectiveTo?: Date | null;
    sourceType?: string | null;
    updatedAt?: Date | null;
}

export type ProductPriceCreationAttributes = Optional<ProductPriceAttributes, 'id' | 'shopId' | 'variantId' | 'discountAmount' | 'taxAmount' | 'effectiveFrom' | 'effectiveTo' | 'sourceType' | 'updatedAt'>;

export class ProductPrice extends Model<ProductPriceAttributes, ProductPriceCreationAttributes> { }

ProductPrice.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    companyId: { type: DataTypes.UUID, field: 'company_id', allowNull: false },
    shopId: { type: DataTypes.UUID, field: 'shop_id', allowNull: true },
    productId: { type: DataTypes.UUID, field: 'product_id', allowNull: false },
    variantId: { type: DataTypes.UUID, field: 'variant_id', allowNull: true },
    mrp: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    sellingPrice: { type: DataTypes.DECIMAL(12, 2), field: 'selling_price', allowNull: false },
    discountAmount: { type: DataTypes.DECIMAL(12, 2), field: 'discount_amount', defaultValue: 0 },
    taxAmount: { type: DataTypes.DECIMAL(12, 2), field: 'tax_amount', defaultValue: 0 },
    effectiveFrom: { type: DataTypes.DATE, field: 'effective_from', allowNull: true },
    effectiveTo: { type: DataTypes.DATE, field: 'effective_to', allowNull: true },
    sourceType: { type: DataTypes.ENUM('erp', 'excel', 'admin', 'api'), field: 'source_type', allowNull: true },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at', allowNull: true }
}, { sequelize, tableName: 'product_price', modelName: 'ProductPrice', timestamps: false, freezeTableName: true });

ProductPrice.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });
ProductPrice.belongsTo(Shop, { foreignKey: 'shopId', targetKey: 'id' });
ProductPrice.belongsTo(ProductMaster, { foreignKey: 'productId', targetKey: 'id' });
ProductPrice.belongsTo(ProductVariant, { foreignKey: 'variantId', targetKey: 'id' });