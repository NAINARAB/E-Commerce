import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { Brand } from './brands.modes';
import { Company } from '../company/company.model';
import { z } from "zod";

export interface ProductMasterAttributes {
    id?: string;
    company_id: string;

    product_code: string;
    product_name: string;
    short_name: string;
    product_description?: string;
    hsn_code?: string | null;

    brand_id?: string | null;
    units?: string | null;
    pack_id?: string | null;

    gst_p?: number;
    cgst_p?: number;
    sgst_p?: number;
    igst_p?: number;
    
    product_rate: number;
    max_rate: number | null;
    selling_rate: number | null;
    
    is_active: boolean;
    erp_id?: string | null;
    
    created_at?: Date;
    updated_at?: Date;
}

export type ProductMasterCreationAttributes = Optional<
    ProductMasterAttributes, 
    'id' | 'hsn_code' | 'brand_id' | 'units' | 'pack_id' | 'is_active' | 'erp_id' | 'created_at' | 'updated_at'
>;

export class ProductMaster extends Model<ProductMasterAttributes, ProductMasterCreationAttributes> {}

ProductMaster.init({
    id: { 
        type: DataTypes.UUID, 
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4 
    },
    product_code: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    product_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    short_name: { 
        type: DataTypes.STRING, 
        allowNull: false 
    },
    product_description: { 
        type: DataTypes.TEXT, 
        allowNull: true 
    },
    company_id: { 
        type: DataTypes.UUID, 
        allowNull: false 
    },
    brand_id: { 
        type: DataTypes.UUID, 
        allowNull: true 
    },
    pack_id: { 
        type: DataTypes.UUID, 
        allowNull: true 
    },
    hsn_code: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    units: { 
        type: DataTypes.STRING, 
        allowNull: true 
    },
    gst_p: { 
        type: DataTypes.DECIMAL(18, 2), 
        allowNull: true,
        defaultValue: 0 
    },
    cgst_p: { 
        type: DataTypes.DECIMAL(18, 2), 
        allowNull: true,
        defaultValue: 0 
    },
    sgst_p: { 
        type: DataTypes.DECIMAL(18, 2), 
        allowNull: true,
        defaultValue: 0 
    },
    igst_p: { 
        type: DataTypes.DECIMAL(18, 2), 
        allowNull: true,
        defaultValue: 0 
    },
    product_rate: { 
        type: DataTypes.DECIMAL(18, 2), 
        allowNull: true,
        defaultValue: 0 
    },
    max_rate: { 
        type: DataTypes.DECIMAL(18, 2), 
        allowNull: true,
        defaultValue: 0 
    },
    selling_rate: { 
        type: DataTypes.DECIMAL(18, 2), 
        allowNull: true,
        defaultValue: 0 
    },
    is_active: { 
        type: DataTypes.BOOLEAN, 
        defaultValue: true 
    },
    erp_id: { 
        type: DataTypes.STRING, 
        allowNull: true 
    }
}, { 
    sequelize, 
    tableName: 'tbl_products', 
    modelName: 'ProductMaster', 
    timestamps: true,
    createdAt: 'created_at', 
    updatedAt: 'updated_at', 
    freezeTableName: true 
});

ProductMaster.belongsTo(Company, { foreignKey: 'company_id', targetKey: 'id' });
ProductMaster.belongsTo(Brand, { foreignKey: 'brand_id', targetKey: 'id' });

export const productCreateSchema = z.object({
    id: z.string().optional(),
    company_id: z.string('Company id is required'),
    brand_id: z.string('Brand id is required'),
    product_code: z.string('Product code is required'),
    product_name: z.string('Product name is required'),
    short_name: z.string('Short name is required'),
    product_description: z.string('Product description is required'),
    hsn_code: z.string().optional().nullable(),
    units: z.string().optional().nullable(),
    pack_id: z.string(),
    gst_p: z.number('GST percentage is required'),
    cgst_p: z.number('CGST percentage is required'),
    sgst_p: z.number('SGST percentage is required'),
    igst_p: z.number('IGST percentage is required'),
    product_rate: z.number('Product rate is required'),
    max_rate: z.number('Max rate is required'),
    selling_rate: z.number('Selling rate is required'),
    is_active: z.boolean().optional(),
    erp_id: z.string().optional().nullable(),
});