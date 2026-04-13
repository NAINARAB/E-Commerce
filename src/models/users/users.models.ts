
import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from "../../config/sequalizer";
import { z } from "zod";
import { UserTypeMaster } from './userType.model';

const modelName = 'UserMaster';

export interface UserAttributes {
    id?: string;
    userType: string;
    name: string;
    email: string;
    mobile: string;
    password: string;
    oldPassword?: string | null | undefined;
    createdAt?: Date | null | undefined;
    updatedAt?: Date | null | undefined;
    isActive?: boolean | null | undefined;
}

type UserCreationAttributes = Optional<UserAttributes, 'id' | 'oldPassword' | 'createdAt' | 'updatedAt' | 'isActive'>;

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
        userType: {
            type: DataTypes.UUID,
            allowNull: false,
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
        oldPassword: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
    },
    {
        sequelize,
        tableName: 'tbl_Users',
        modelName: modelName,
        timestamps: false,
        freezeTableName: true,
        defaultScope: {
            attributes: { exclude: ['password', 'oldPassword'] }
        }
    }
);

UserMaster.belongsTo(UserTypeMaster, { foreignKey: 'userType', targetKey: 'id' });

export const userAccKey = {
    id: `${modelName}.id`,
    userType: `${modelName}.userType`,
    name: `${modelName}.name`,
    email: `${modelName}.email`,
    mobile: `${modelName}.mobile`,
    password: `${modelName}.password`,
    oldPassword: `${modelName}.oldPassword`,
    isActive: `${modelName}.isActive`,
    createdAt: `${modelName}.createdAt`,
    updatedAt: `${modelName}.updatedAt`,
}

export const userCreateSchema = z.object({
    userType: z.string('userType is required'),
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
    userType: z.string('userType is required'),
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
