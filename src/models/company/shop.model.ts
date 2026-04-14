import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";
import { Company } from './company.model';
import { ProductMaster } from '../products/product.model';

export interface ShopAttributes {
    id?: string;
    companyId: string;
    code: string;
    name: string;
    branchName?: string | null;
    erpId?: string | null;
    isActive?: boolean | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

// --- ProductShopMap ---
export interface ProductShopMapAttributes {
    id?: string;
    productId: string;
    shopId: string;
    isEnabled?: boolean | null;
    displayOrder?: number | null;
}

export type ShopCreationAttributes = Optional<ShopAttributes, 'id' | 'branchName' | 'erpId' | 'isActive' | 'createdAt' | 'updatedAt'>;
export class Shop extends Model<ShopAttributes, ShopCreationAttributes> {}

export type ProductShopMapCreationAttributes = Optional<ProductShopMapAttributes, 'id' | 'isEnabled' | 'displayOrder'>;
export class ProductShopMap extends Model<ProductShopMapAttributes, ProductShopMapCreationAttributes> {}

Shop.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    companyId: { type: DataTypes.UUID, field: 'company_id', allowNull: false },
    code: { type: DataTypes.STRING, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    branchName: { type: DataTypes.STRING, field: 'branch_name', allowNull: true },
    erpId: { type: DataTypes.STRING, field: 'erp_id', allowNull: true },
    isActive: { type: DataTypes.BOOLEAN, field: 'is_active', defaultValue: true },
    createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at', allowNull: true }
}, { sequelize, tableName: 'shops', modelName: 'Shop', timestamps: false, freezeTableName: true });

export const shopSchema = z.object({
    companyId: z.string(),
    code: z.string().min(1),
    name: z.string().min(1),
    branchName: z.string().optional().nullable(),
    erpId: z.string().optional().nullable(),
    isActive: z.boolean().optional()
});


ProductShopMap.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    productId: { type: DataTypes.UUID, field: 'product_id', allowNull: false },
    shopId: { type: DataTypes.UUID, field: 'shop_id', allowNull: false },
    isEnabled: { type: DataTypes.BOOLEAN, field: 'is_enabled', defaultValue: true },
    displayOrder: { type: DataTypes.INTEGER, field: 'display_order', defaultValue: 0 }
}, { sequelize, tableName: 'product_shop_map', modelName: 'ProductShopMap', timestamps: false, freezeTableName: true });

Shop.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });
ProductShopMap.belongsTo(ProductMaster, { foreignKey: 'productId', targetKey: 'id' });
ProductShopMap.belongsTo(Shop, { foreignKey: 'shopId', targetKey: 'id' });