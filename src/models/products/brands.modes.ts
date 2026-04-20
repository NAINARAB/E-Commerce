import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";
import { Company } from '../company/company.model';

export interface BrandAttributes {
    id?: string;
    company_id: string;
    name: string;
    is_active?: boolean | null;
    erp_id?: string | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}

export type BrandCreationAttributes = Optional<BrandAttributes, 'id' | 'is_active' | 'erp_id' | 'created_at' | 'updated_at'>;

export class Brand extends Model<BrandAttributes, BrandCreationAttributes> {}

Brand.init({
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    company_id: { 
        type: DataTypes.UUID, 
        field: 'company_id', 
        allowNull: false 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        field: 'is_active', 
        defaultValue: true 
    },
    erp_id: { 
        type: DataTypes.STRING, 
        field: 'erp_id', 
        allowNull: true 
    }
}, { 
    sequelize, 
    tableName: 'tbl_brands', 
    modelName: 'Brand', 
    timestamps: true, 
    createdAt: 'created_at', 
    updatedAt: 'updated_at', 
    freezeTableName: true 
});

export const brandSchema = z.object({
    id: z.string().optional(),
    company_id: z.string('Company id is required'),
    name: z.string('Name is required').min(1),
    is_active: z.boolean().optional(),
    erp_id: z.string().optional().nullable(),
});

Brand.belongsTo(Company, { foreignKey: 'company_id', targetKey: 'id' });