import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";
import { Company } from '../company/company.model';

export interface BrandAttributes {
    id?: string;
    companyId: string;
    name: string;
    slug: string;
    isActive?: boolean | null;
    erpId?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
}

export type BrandCreationAttributes = Optional<BrandAttributes, 'id' | 'isActive' | 'erpId' | 'createdAt' | 'updatedAt'>;

export class Brand extends Model<BrandAttributes, BrandCreationAttributes> {}

Brand.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    companyId: { type: DataTypes.UUID, field: 'company_id', allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false },
    isActive: { type: DataTypes.BOOLEAN, field: 'is_active', defaultValue: true },
    erpId: { type: DataTypes.STRING, field: 'erp_id', allowNull: true },
    createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at', allowNull: true }
}, { sequelize, tableName: 'brands', modelName: 'Brand', timestamps: false, freezeTableName: true });

export const brandSchema = z.object({
    companyId: z.string(),
    name: z.string().min(1),
    slug: z.string().min(1),
    isActive: z.boolean().optional(),
    erpId: z.string().optional().nullable(),
});

Brand.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });