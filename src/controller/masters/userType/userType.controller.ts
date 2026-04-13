import { Request, Response } from "express";
import { created, sentData, servError } from "../../../response";
import { validateBody } from "../../../middleware/zodValidator";
import { UserTypeMaster, userTypeSchema } from "../../../models/users/userType.model";

/**
 * @swagger
 * tags:
 *   name: UserType
 *   description: User type management operations
 */

/**
 * @swagger
 * /api/masters/userType:
 *   get:
 *     summary: Retrieve a list of user types
 *     tags: [UserType]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Items per page
 *       - in: query
 *         name: paginate
 *         schema:
 *           type: boolean
 *         description: Set to true to return paginated results
 *     responses:
 *       200:
 *         description: A list of user types.
 *       500:
 *         description: Server error
 */
export const getUserTypes = async (req: Request, res: Response) => {
    try {
        const { page, limit, offset, paginate, where } = (req as any).pagination;

        if (paginate) {
            const { rows, count } = await UserTypeMaster.findAndCountAll({
                where,
                limit,
                offset,
                order: [['userType', 'ASC']],
            });

            return sentData(res, rows, {
                totalRecords: count,
                currentPage: page,
                totalPages: Math.ceil(count / limit),
            });
        }

        const data = await UserTypeMaster.findAll({
            where,
            order: [['userType', 'ASC']],
        });

        sentData(res, data);
    } catch (e) {
        servError(e, res);
    }
};

// export const getUserById = async (req: Request, res: Response) => {
//     try {
//         const { id } = req.params;
//         if (!id) return invalidInput(res, 'id parameter is required');

//         const user = await UserMaster.findByPk(id);
//         if (!user) return notFound(res, 'User not found');
//         dataFound(res, [user]);
//     } catch (e) {
//         servError(e, res);
//     }
// };

/**
 * @swagger
 * /api/masters/userType:
 *   post:
 *     summary: Create a new user type
 *     tags: [UserType]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userType:
 *                 type: string
 *                 description: The user type's name.
 *                 example: Admin
 *               alias:
 *                 type: string
 *                 description: The alias of the user type.
 *                 example: admin 1
 *     responses:
 *       201:
 *         description: The user type was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
export const createUserType = async (req: Request, res: Response) => {
    try {
        const validatedData = validateBody(userTypeSchema, req.body, res);
        if (!validatedData) return;

        const newUserType = await UserTypeMaster.create(validatedData);

        created(res, newUserType);
    } catch (e) {
        servError(e, res);
    }
};