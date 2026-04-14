import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { Company } from '../company/company.model';
import { Shop } from '../company/branch.model';
import { ProductMaster } from './product.model';
import { ProductVariant } from './variant.model';

export interface ProductStockAttributes {
    id?: string;
    companyId: string;
    shopId?: string | null;
    productId: string;
    variantId?: string | null;
    closingStock?: number | null;
    reservedStock?: number | null;
    availableStock?: number | null;
    lowStockLevel?: number | null;
    lastStockSyncAt?: Date | null;
}

export type ProductStockCreationAttributes = Optional<ProductStockAttributes, 'id' | 'shopId' | 'variantId' | 'closingStock' | 'reservedStock' | 'availableStock' | 'lowStockLevel' | 'lastStockSyncAt'>;

export class ProductStock extends Model<ProductStockAttributes, ProductStockCreationAttributes> { }

ProductStock.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    companyId: { type: DataTypes.UUID, field: 'company_id', allowNull: false },
    shopId: { type: DataTypes.UUID, field: 'shop_id', allowNull: true },
    productId: { type: DataTypes.UUID, field: 'product_id', allowNull: false },
    variantId: { type: DataTypes.UUID, field: 'variant_id', allowNull: true },
    closingStock: { type: DataTypes.DECIMAL(12, 3), field: 'closing_stock', defaultValue: 0 },
    reservedStock: { type: DataTypes.DECIMAL(12, 3), field: 'reserved_stock', defaultValue: 0 },
    availableStock: { type: DataTypes.DECIMAL(12, 3), field: 'available_stock', allowNull: true },
    lowStockLevel: { type: DataTypes.DECIMAL(12, 3), field: 'low_stock_level', allowNull: true },
    lastStockSyncAt: { type: DataTypes.DATE, field: 'last_stock_sync_at', allowNull: true }
}, { 
    sequelize, 
    tableName: 'product_stock', 
    modelName: 'ProductStock', 
    timestamps: false, 
    freezeTableName: true 
});

ProductStock.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });
ProductStock.belongsTo(Shop, { foreignKey: 'shopId', targetKey: 'id' });
ProductStock.belongsTo(ProductMaster, { foreignKey: 'productId', targetKey: 'id' });
ProductStock.belongsTo(ProductVariant, { foreignKey: 'variantId', targetKey: 'id' });