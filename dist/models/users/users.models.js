"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordSchema = exports.userUpdateSchema = exports.userCreateSchema = exports.userAccKey = exports.UserMaster = void 0;
const sequelize_1 = require("sequelize");
const sequalizer_1 = require("../../config/sequalizer");
const zod_1 = require("zod");
const modelName = 'UserMaster';
class UserMaster extends sequelize_1.Model {
}
exports.UserMaster = UserMaster;
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
UserMaster.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    name: {
        type: sequelize_1.DataTypes.STRING(300),
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false,
        unique: true,
    },
    mobile: {
        type: sequelize_1.DataTypes.STRING(15),
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    old_password: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    is_active: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    sequelize: sequalizer_1.sequelize,
    tableName: 'tbl_customers',
    modelName: modelName,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    freezeTableName: true,
    defaultScope: {
        attributes: { exclude: ['password', 'old_password'] }
    },
});
exports.userAccKey = {
    id: `${modelName}.id`,
    name: `${modelName}.name`,
    email: `${modelName}.email`,
    mobile: `${modelName}.mobile`,
    password: `${modelName}.password`,
    old_password: `${modelName}.old_password`,
    is_active: `${modelName}.is_active`,
    created_at: `${modelName}.created_at`,
    updated_at: `${modelName}.updated_at`,
};
exports.userCreateSchema = zod_1.z.object({
    name: zod_1.z.string('Name is required')
        .min(4, "Name should be minimum 4 chars")
        .max(100, "Name should be maximum 100 chars"),
    email: zod_1.z.string('Email is required')
        .max(100, "Email should be maximum 100 chars"),
    mobile: zod_1.z.string('Mobile number is required')
        .min(10, "Mobile number should be minimum 10 chars")
        .max(10, "Mobile number should be maximum 10 chars"),
    password: zod_1.z.string('Password is required')
        .min(6, "Password should be minimum 6 chars")
        .max(100, "Password should be maximum 100 chars"),
});
exports.userUpdateSchema = zod_1.z.object({
    id: zod_1.z.string('id is required'),
    name: zod_1.z.string('Name is required')
        .min(4, "Name should be minimum 4 chars")
        .max(100, "Name should be maximum 100 chars"),
    email: zod_1.z.string('Email is required')
        .max(100, "Email should be maximum 100 chars"),
    mobile: zod_1.z.string('Mobile number is required')
        .min(10, "Mobile number should be minimum 10 chars")
        .max(10, "Mobile number should be maximum 10 chars"),
});
exports.changePasswordSchema = zod_1.z.object({
    oldPassword: zod_1.z.string('oldPassword is required').min(1),
    newPassword: zod_1.z.string('newPassword is required').min(6),
});
