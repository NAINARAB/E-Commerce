"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePassword = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserById = exports.getUsers = void 0;
const users_models_1 = require("../../../models/users/users.models");
const response_1 = require("../../../response");
const zodValidator_1 = require("../../../middleware/zodValidator");
const hash_1 = require("../../authorization/loginAndRegister/hash");
const getUsers = async (req, res) => {
    try {
        const { page, limit, offset, paginate, where } = req.pagination;
        if (paginate) {
            const { rows, count } = await users_models_1.UserMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [['name', 'ASC']],
            });
            return (0, response_1.sentData)(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }
        const data = await users_models_1.UserMaster.findAll({
            where,
            order: [['name', 'ASC']],
        });
        (0, response_1.sentData)(res, data);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.getUsers = getUsers;
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const user = await users_models_1.UserMaster.findByPk(id);
        if (!user)
            return (0, response_1.notFound)(res, 'User not found');
        (0, response_1.dataFound)(res, [user]);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.getUserById = getUserById;
const createUser = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(users_models_1.userCreateSchema, req.body, res);
        if (!validatedData)
            return;
        const hashed = await (0, hash_1.hashPassword)(validatedData.password);
        const newUser = await users_models_1.UserMaster.create({
            ...validatedData,
            password: hashed,
            old_password: hashed,
            is_active: true,
        });
        (0, response_1.created)(res, newUser);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.createUser = createUser;
const updateUser = async (req, res) => {
    try {
        const validatedData = (0, zodValidator_1.validateBody)(users_models_1.userUpdateSchema, req.body, res);
        if (!validatedData)
            return;
        const user = await users_models_1.UserMaster.findByPk(validatedData.id);
        if (!user)
            return (0, response_1.notFound)(res, 'User not found');
        delete validatedData.password;
        await user.update({
            ...validatedData,
        });
        (0, response_1.updated)(res, user);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id)
            return (0, response_1.invalidInput)(res, 'id parameter is required');
        const user = await users_models_1.UserMaster.findByPk(id);
        if (!user)
            return (0, response_1.notFound)(res, 'User not found');
        await user.update({ is_active: false });
        (0, response_1.deleted)(res);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.deleteUser = deleteUser;
const changePassword = async (req, res) => {
    try {
        const { id, oldPassword, newPassword } = req.body;
        const user = await users_models_1.UserMaster.findByPk(id);
        if (!user)
            return (0, response_1.notFound)(res, 'User not found');
        const storedPassword = user.password;
        if (!storedPassword)
            return (0, response_1.servError)(new Error('password not available'), res);
        const match = await (0, hash_1.verifyPassword)(oldPassword, storedPassword);
        if (!match) {
            return (0, response_1.invalidInput)(res, 'password is incorrect');
        }
        const hashed = await (0, hash_1.hashPassword)(newPassword);
        await user.update({ password: hashed });
        (0, response_1.updated)(res);
    }
    catch (e) {
        (0, response_1.servError)(e, res);
    }
};
exports.changePassword = changePassword;
