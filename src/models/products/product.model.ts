import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { Brand } from './brands.modes';
import { Company } from '../company/company.model';

// --- ProductMaster ---
export interface ProductMasterAttributes {
    id?: string;
    companyId: string;
    erpProductCode: string;
    sku?: string | null;
    productName: string;
    slug: string;
    shortDescription?: string | null;
    description?: string | null;
    brandId?: string | null;
    hsnCode?: string | null;
    uom?: string | null;
    taxRate?: number | null;
    isEcommerceEnabled?: boolean | null;
    erpId?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}
export type ProductMasterCreationAttributes = Optional<ProductMasterAttributes, 'id' | 'sku' | 'shortDescription' | 'description' | 'brandId' | 'hsnCode' | 'uom' | 'taxRate' | 'isEcommerceEnabled' | 'erpId' | 'createdAt' | 'updatedAt' | 'deletedAt'>;

export class ProductMaster extends Model<ProductMasterAttributes, ProductMasterCreationAttributes> {}

ProductMaster.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    companyId: { type: DataTypes.UUID, field: 'company_id', allowNull: false },
    erpProductCode: { type: DataTypes.STRING, field: 'erp_product_code', allowNull: false },
    sku: { type: DataTypes.STRING, allowNull: true },
    productName: { type: DataTypes.STRING, field: 'product_name', allowNull: false },
    slug: { type: DataTypes.STRING, allowNull: false },
    shortDescription: { type: DataTypes.STRING, field: 'short_description', allowNull: true },
    description: { type: DataTypes.TEXT, allowNull: true },
    brandId: { type: DataTypes.UUID, field: 'brand_id', allowNull: true },
    hsnCode: { type: DataTypes.STRING, field: 'hsn_code', allowNull: true },
    uom: { type: DataTypes.STRING, allowNull: true },
    taxRate: { type: DataTypes.DECIMAL(5,2), field: 'tax_rate', allowNull: true },
    isEcommerceEnabled: { type: DataTypes.BOOLEAN, field: 'is_ecommerce_enabled', defaultValue: true },
    erpId: { type: DataTypes.STRING, field: 'erp_id', allowNull: true },
    createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW },
    updatedAt: { type: DataTypes.DATE, field: 'updated_at', allowNull: true },
    deletedAt: { type: DataTypes.DATE, field: 'deleted_at', allowNull: true }
}, { sequelize, tableName: 'product_master', modelName: 'ProductMaster', timestamps: false, freezeTableName: true });

ProductMaster.belongsTo(Company, { foreignKey: 'companyId', targetKey: 'id' });
ProductMaster.belongsTo(Brand, { foreignKey: 'brandId', targetKey: 'id' });