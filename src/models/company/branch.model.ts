import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";
import { Company } from './company.model';

export interface ShopAttributes {
    id?: string;
    company_id: string;
    code: string;
    name: string;
    erp_id?: string | null;
    is_active?: boolean | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}

export type ShopCreationAttributes = Optional<ShopAttributes, 'id' | 'erp_id' | 'is_active' | 'created_at' | 'updated_at'>;
export class Shop extends Model<ShopAttributes, ShopCreationAttributes> {}

Shop.init({
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    company_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    code: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    erp_id: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    }
}, { 
    sequelize, 
    tableName: 'tbl_shops', 
    modelName: 'Shop', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true 
});

Shop.belongsTo(Company, { foreignKey: 'company_id', targetKey: 'id' });

export const shopSchema = z.object({
    company_id: z.string(),
    code: z.string().min(1),
    name: z.string().min(1),
    erp_id: z.string().optional().nullable(),
});