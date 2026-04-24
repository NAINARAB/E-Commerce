import { Request, Response } from "express";
import { verifyPassword } from "./hash";
import { signJwt } from "./jwtAuth";
import { UserMaster } from "../../../models/users/users.models";
import { dataFound, invalidInput, notFound, servError } from "../../../response";
import { createUser } from "../../masters/users/user.controller";

export type JwtUser = {
    id: string;
    name: string;
};

/**
 * @swagger
 * /api/authorization/loginAndRegister/register:
 *   post:
 *     summary: Register a new user
 *     tags: [api/authorization/loginAndRegister]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's name.
 *                 example: user name
 *               email:
 *                 type: string
 *                 description: The user's email.
 *                 example: usermail@example.com
 *               mobile:
 *                 type: string
 *                 description: The user's mobile number.
 *                 example: '1234567890'
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: securePassword123
 *     responses:
 *       201:
 *         description: The user was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

export const register = async (req: Request, res: Response) => {
    try {
        return await createUser(req, res);
    } catch (err) {
        servError(err, res);
    }
}

/**
 * @swagger
 * /api/authorization/loginAndRegister/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user
 *     tags: [api/authorization/loginAndRegister]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: 
 *                 type: string
 *                 description: Username
 *               password: 
 *                 type: string
 *                 description: Password
 *             required:
 *               - username
 *               - password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */

export const login = async (req: Request, res: Response) => {
    const { username, password } = req.body as { username?: string; password?: string };

    try {

        if (!username || !password) return invalidInput(res, 'username and password are required');

        const user: any = await UserMaster.unscoped().findOne({
            where: {
                mobile: username,
                is_active: 1
            }
        });

        if (!user) return notFound(res, 'Invalid credentials');

        const passwordCheck = await verifyPassword(password, user.password);
        if (!passwordCheck) return notFound(res, 'Invalid credentials');

        const payload: JwtUser = {
            id: user.id,
            name: user.name,
        };

        const token = signJwt(payload);

        dataFound(res, [], 'dataFound', {
            token, user: payload
        });

    } catch (err) {
        servError(err, res);
    }
}
