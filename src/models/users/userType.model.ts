import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";

const modelName = 'UserTypeMaster';

export interface UserTypeAttributes {
    id: string;
    userType: string;
    alias?: string | null | undefined;
    isActive?: boolean | null | undefined;
}

export type UserTypeCreationAttributes = Optional<UserTypeAttributes, "id" | "alias" | "isActive">

export class UserTypeMaster extends Model<UserTypeAttributes, UserTypeCreationAttributes> { }

UserTypeMaster.init({
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    userType: {
        type: DataTypes.STRING(250),
        allowNull: false,
        unique: true,
    },
    alias: {
        type: DataTypes.STRING(250),
        allowNull: true,
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
    }
}, {
    sequelize,
    tableName: 'tbl_User_Type',
    modelName: modelName,
    timestamps: false,
    freezeTableName: true
});

export const userTypeAccKey = {
    id: `${modelName}.id`,
    userType: `${modelName}.userType`,
    alias: `${modelName}.alias`,
    isActive: `${modelName}.isActive`,
}

export const userTypeSchema = z.object({
    userType: z.string('UserType is required'),
    alias: z.string().optional().nullable(),
    isActive: z.boolean().optional().default(true),
});