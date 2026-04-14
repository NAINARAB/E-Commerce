import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";


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

export type ShopCreationAttributes = Optional<ShopAttributes, 'id' | 'branchName' | 'erpId' | 'isActive' | 'createdAt' | 'updatedAt'>;

export class Shop extends Model<ShopAttributes, ShopCreationAttributes> {}

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
}, { 
    sequelize, 
    tableName: 'shops', 
    modelName: 'Shop', 
    timestamps: false, 
    freezeTableName: true 
});

export const shopSchema = z.object({
    companyId: z.string(),
    code: z.string().min(1),
    name: z.string().min(1),
    branchName: z.string().optional().nullable(),
    erpId: z.string().optional().nullable(),
    isActive: z.boolean().optional()
});