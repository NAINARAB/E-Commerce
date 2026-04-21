import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { Company } from "../company/company.model";
import { ProductMaster } from "./product.model";
import { z } from 'zod';


// --- ProductPrice ---
export interface ProductPriceAttributes {
    id?: string;
    company_id: string;
    product_id: string;
    mrp: number;
    selling_price: number;
    discount_amount: number;
    discount_percentage: number;
    effective_from?: Date | null;
    effective_to?: Date | null;
    created_at?: Date | null;
    updated_at?: Date | null;
}

export type ProductPriceCreationAttributes = Optional<
    ProductPriceAttributes,
    'id' | 'discount_amount' | 'discount_percentage' | 'effective_from'
    | 'effective_to' | 'created_at' | 'updated_at'
>;

export class ProductPrice extends Model<ProductPriceAttributes, ProductPriceCreationAttributes> { }

ProductPrice.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    company_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    product_id: {
        type: DataTypes.UUID,
        allowNull: false
    },
    mrp: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
    },
    selling_price: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
    },
    discount_amount: {
        type: DataTypes.DECIMAL(12, 2),
        defaultValue: 0
    },
    discount_percentage: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
        defaultValue: 0
    },
    effective_from: {
        type: DataTypes.DATE,
        allowNull: false
    },
    effective_to: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize,
    tableName: 'tbl_product_price',
    modelName: 'ProductPrice',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
    indexes: [{ fields: ['company_id', 'product_id'] }]
});

ProductPrice.belongsTo(Company, { foreignKey: 'company_id', targetKey: 'id' });
ProductPrice.belongsTo(ProductMaster, { foreignKey: 'product_id', targetKey: 'id' });
ProductMaster.hasMany(ProductPrice, { foreignKey: 'product_id', as: 'prices' });

export const productPriceSchema = z.object({
    id: z.string().optional(),
    company_id: z.string('Company id is required'),
    product_id: z.string('Product id is required'),
    mrp: z.number('Mrp is required'),
    selling_price: z.number('Selling price is required'),
    discount_amount: z.number('Discount amount is required').default(0),
    discount_percentage: z.number('Discount percentage is required').default(0),
    effective_from: z.date().optional(),
    effective_to: z.date().optional(),
});