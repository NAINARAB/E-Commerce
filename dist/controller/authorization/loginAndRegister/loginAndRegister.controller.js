"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const hash_1 = require("./hash");
const jwtAuth_1 = require("./jwtAuth");
const users_models_1 = require("../../../models/users/users.models");
const response_1 = require("../../../response");
const user_controller_1 = require("../../masters/users/user.controller");
/**
 * @swagger
 * tags:
 *   name: LoginAndRegister
 *   description: Login and register operations
 */
/**
 * @swagger
 * /api/authorization/loginAndRegister/register:
 *   post:
 *     summary: Register a new user
 *     tags: [LoginAndRegister]
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
const register = async (req, res) => {
    try {
        return await (0, user_controller_1.createUser)(req, res);
    }
    catch (err) {
        (0, response_1.servError)(err, res);
    }
};
exports.register = register;
/**
 * @swagger
 * /api/authorization/loginAndRegister/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user
 *     tags: [LoginAndRegister]
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
const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password)
            return (0, response_1.invalidInput)(res, 'username and password are required');
        const user = await users_models_1.UserMaster.unscoped().findOne({
            where: {
                mobile: username,
                is_active: 1
            }
        });
        if (!user)
            return (0, response_1.notFound)(res, 'Invalid credentials');
        const passwordCheck = await (0, hash_1.verifyPassword)(password, user.password);
        if (!passwordCheck)
            return (0, response_1.notFound)(res, 'Invalid credentials');
        const payload = {
            id: user.id,
            name: user.name,
        };
        const token = (0, jwtAuth_1.signJwt)(payload);
        (0, response_1.dataFound)(res, [], 'dataFound', {
            token, user: payload
        });
    }
    catch (err) {
        (0, response_1.servError)(err, res);
    }
};
exports.login = login;
