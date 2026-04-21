import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { Company } from '../company/company.model';
import { Shop } from '../company/branch.model';
import { ProductMaster } from './product.model';
import { z } from 'zod';

export interface ProductStockAttributes {
    id?: string;
    company_id: string;
    shop_id: string;
    product_id: string;
    reserved_stock: number;
    available_stock: number;
    last_stock_sync_at: Date;
}

export type ProductStockCreationAttributes = Optional<ProductStockAttributes, 'id' | 'reserved_stock' | 'last_stock_sync_at'>;

export class ProductStock extends Model<ProductStockAttributes, ProductStockCreationAttributes> { }

ProductStock.init({
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    company_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    shop_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    product_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    reserved_stock: { 
        type: DataTypes.DECIMAL(12, 3), 
        allowNull: false,
        defaultValue: 0 
    },
    available_stock: { 
        type: DataTypes.DECIMAL(12, 3), 
        allowNull: false,
        defaultValue: 0
    },
    last_stock_sync_at: { 
        type: DataTypes.DATE, 
        allowNull: false,
        defaultValue: DataTypes.NOW 
    }
}, { 
    sequelize, 
    tableName: 'tbl_product_stock', 
    modelName: 'ProductStock', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at', 
    freezeTableName: true 
});

ProductStock.belongsTo(Company, { foreignKey: 'company_id', targetKey: 'id' });
ProductStock.belongsTo(Shop, { foreignKey: 'shop_id', targetKey: 'id' });
ProductStock.belongsTo(ProductMaster, { foreignKey: 'product_id', targetKey: 'id' });
ProductMaster.hasMany(ProductStock, { foreignKey: 'product_id', as: 'stocks' });

export const productStockSchema = z.object({
    id: z.string().optional(),
    company_id: z.string('Company id is required'),
    shop_id: z.string('Shop id is required'),
    product_id: z.string('Product id is required'),
    reserved_stock: z.number('Reserved stock is required').default(0),
    available_stock: z.number('Available stock is required'),
    last_stock_sync_at: z.date().optional(),
});