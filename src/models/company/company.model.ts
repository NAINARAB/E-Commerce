import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";

export interface CompanyAttributes {
    id?: string;
    code: string;
    name: string;
    isActive?: boolean | null;
    erpId?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export type CompanyCreationAttributes = Optional<CompanyAttributes, 'id' | 'isActive' | 'createdAt' | 'updatedAt'>;

export class Company extends Model<CompanyAttributes, CompanyCreationAttributes> {}

Company.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    code: { type: DataTypes.STRING, allowNull: false, unique: true },
    name: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, field: 'is_active', defaultValue: true },
    erpId: { type: DataTypes.STRING, field: 'erp_id', allowNull: true },
    createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at', allowNull: true }
}, { sequelize, tableName: 'companies', modelName: 'Company', timestamps: false, freezeTableName: true });

export const companySchema = z.object({
    code: z.string().min(1),
    name: z.string().min(1),
    isActive: z.boolean().optional(),
    erpId: z.string().optional().nullable(),
});
