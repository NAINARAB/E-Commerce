
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";

const modelName = 'UserMaster';

export interface UserAttributes {
    id?: string;
    name: string;
    email: string;
    mobile: string;
    password: string;
    old_password?: string | null | undefined;
    created_at?: Date | null | undefined;
    updated_at?: Date | null | undefined;
    is_active?: boolean | null | undefined;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'old_password' | 'created_at' | 'updated_at' | 'is_active'>;

export class UserMaster extends Model<UserAttributes, UserCreationAttributes> { }
//     implements UserAttributes {

//     declare id: string;
//     declare userType: string;
//     declare name: string;
//     declare email: string;
//     declare mobile: string;
//     declare password: string;
//     declare oldPassword: string;
//     declare isActive: boolean | null;
//     declare createdAt: Date;
//     declare updatedAt: Date;
// }

UserMaster.init(
    {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        name: {
            type: DataTypes.STRING(300),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        mobile: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        old_password: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        sequelize,
        tableName: 'tbl_customers',
        modelName: modelName,
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        freezeTableName: true,
        defaultScope: {
            attributes: { exclude: ['password', 'old_password'] }
        },
    }
);

export const userAccKey = {
    id: `${modelName}.id`,
    name: `${modelName}.name`,
    email: `${modelName}.email`,
    mobile: `${modelName}.mobile`,
    password: `${modelName}.password`,
    old_password: `${modelName}.old_password`,
    is_active: `${modelName}.is_active`,
    created_at: `${modelName}.created_at`,
    updated_at: `${modelName}.updated_at`,
}

export const userCreateSchema = z.object({
    name: z.string('Name is required')
        .min(4, "Name should be minimum 4 chars")
        .max(100, "Name should be maximum 100 chars"),
    email: z.string('Email is required')
        .max(100, "Email should be maximum 100 chars"),
    mobile: z.string('Mobile number is required')
        .min(10, "Mobile number should be minimum 10 chars")
        .max(10, "Mobile number should be maximum 10 chars"),
    password: z.string('Password is required')
        .min(6, "Password should be minimum 6 chars")
        .max(100, "Password should be maximum 100 chars"),
});

export const userUpdateSchema = z.object({
    id: z.string('id is required'),
    name: z.string('Name is required')
        .min(4, "Name should be minimum 4 chars")
        .max(100, "Name should be maximum 100 chars"),
    email: z.string('Email is required')
        .max(100, "Email should be maximum 100 chars"),
    mobile: z.string('Mobile number is required')
        .min(10, "Mobile number should be minimum 10 chars")
        .max(10, "Mobile number should be maximum 10 chars"),
});

export const changePasswordSchema = z.object({
    oldPassword: z.string('oldPassword is required').min(1),
    newPassword: z.string('newPassword is required').min(6),
});
