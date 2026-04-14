import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";

// --- Attribute ---
export interface AttributeAttributes {
    id?: string;
    name: string;
    createdAt?: Date | null;
}

export type AttributeCreationAttributes = Optional<AttributeAttributes, 'id' | 'createdAt'>;

export class Attribute extends Model<AttributeAttributes, AttributeCreationAttributes> {}

Attribute.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    name: { type: DataTypes.STRING, allowNull: false },
    createdAt: { type: DataTypes.DATE, field: 'created_at', defaultValue: DataTypes.NOW }
}, { 
    sequelize, 
    tableName: 'attributes', 
    modelName: 'Attribute', 
    timestamps: false, 
    freezeTableName: true 
});

// --- Attribute Value ---
export interface AttributeValueAttributes {
    id?: string;
    attributeId: string;
    value: string;
}

export type AttributeValueCreationAttributes = Optional<AttributeValueAttributes, 'id'>;

export class AttributeValue extends Model<AttributeValueAttributes, AttributeValueCreationAttributes> {}

AttributeValue.init({
    id: { type: DataTypes.UUID, primaryKey: true, defaultValue: DataTypes.UUIDV4 },
    attributeId: { type: DataTypes.UUID, field: 'attribute_id', allowNull: false },
    value: { type: DataTypes.STRING, allowNull: false }
}, { 
    sequelize, 
    tableName: 'attribute_values', 
    modelName: 'AttributeValue', 
    timestamps: false, 
    freezeTableName: true 
});

// Associations
AttributeValue.belongsTo(Attribute, { foreignKey: 'attributeId', targetKey: 'id' });
