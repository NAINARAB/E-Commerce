import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";

export interface CompanyAttributes {
    id?: string;
    code: string;
    name: string;
    is_active?: boolean | null;
    erp_id?: string | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}

export type CompanyCreationAttributes = Optional<CompanyAttributes, 'id' | 'is_active' | 'created_at' | 'updated_at'>;

export class Company extends Model<CompanyAttributes, CompanyCreationAttributes> {}

Company.init({
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    code: { 
        type: DataTypes.STRING, 
        allowNull: false, 
        unique: true 
    },
    name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        allowNull: true, 
        defaultValue: true 
    },
    erp_id: { 
        type: DataTypes.STRING, 
        allowNull: true 
    }
}, { 
    sequelize, 
    tableName: 'tbl_companies', 
    modelName: 'Company', 
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
});

// Company.hasMany(Shop, {
//     foreignKey: 'company_id',
//     as: 'shops' 
// })

export const companySchema = z.object({
    code: z.string().min(1),
    name: z.string().min(1),
    erp_id: z.string().optional().nullable(),
});
