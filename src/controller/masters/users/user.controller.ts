import { Request, Response } from "express";
import { userCreateSchema, UserMaster, userUpdateSchema } from "../../../models/users/users.models";
import { UserTypeMaster } from "../../../models/users/userType.model";
import { created, dataFound, deleted, invalidInput, notFound, sentData, servError, updated } from "../../../response";
import { validateBody } from "../../../middleware/zodValidator";
import { hashPassword, verifyPassword } from "../../authorization/loginAndRegister/hash";


export const getUsers = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await UserMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [['name', 'ASC']],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await UserMaster.findAll({
            where,
            order: [['name', 'ASC']],
        });

        sentData(res, data);
    } catch (e) {
        servError(e, res);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const user = await UserMaster.findByPk(id as string);
        if (!user) return notFound(res, 'User not found');
        dataFound(res, [user]);
    } catch (e) {
        servError(e, res);
    }
};

export const createUser = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(userCreateSchema, req.body, res);
        if (!validatedData) return;

        const hashed = await hashPassword(validatedData.password);

        const checkUserType = await UserTypeMaster.findByPk(validatedData.userType);
        if (!checkUserType) return invalidInput(res, 'Invalid userType ID');

        const newUser = await UserMaster.create({
            ...validatedData,
            password: hashed,
            oldPassword: hashed,
            createdAt: new Date(),
            isActive: true,
        });

        created(res, newUser);
    } catch (e) {
        servError(e, res);
    }
};

export const updateUser = async (req: Request, res: Response) => {
    try {

        const validatedData = validateBody(userUpdateSchema, req.body, res);
        if (!validatedData) return;

        const user = await UserMaster.findByPk(validatedData.id);
        if (!user) return notFound(res, 'User not found');

        const checkUserType = await UserTypeMaster.findByPk(validatedData.userType);
        if (!checkUserType) return invalidInput(res, 'Invalid userType ID');

        delete (validatedData as any).password;

        await user.update({
            ...validatedData,
            updatedAt: new Date(),
        });

        updated(res, user);
    } catch (e) {
        servError(e, res);
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        if (!id) return invalidInput(res, 'id parameter is required');

        const user = await UserMaster.findByPk(id as string);
        if (!user) return notFound(res, 'User not found');

        await user.update({ isActive: false });
        deleted(res);
    } catch (e) {
        servError(e, res);
    }
};

export const changePassword = async (req: Request, res: Response) => {
    try {
        const { id, oldPassword, newPassword } = req.body;

        const user = await UserMaster.findByPk(id as string);
        if (!user) return notFound(res, 'User not found');

        const storedPassword: string = (user as any).password;
        if (!storedPassword) return servError(new Error('password not available'), res);

        const match = await verifyPassword(oldPassword, storedPassword);
        if (!match) {
            return invalidInput(res, 'password is incorrect');
        }

        const hashed = await hashPassword(newPassword);

        await user.update({ password: hashed });

        updated(res);
    } catch (e) {
        servError(e, res);
    }
};