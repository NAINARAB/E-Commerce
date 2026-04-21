"use strict";
/**
 * @swagger
 * tags:
 *   name: Company
 *   description: Company management operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * /api/masters/company:
 *   get:
 *     summary: Retrieve a list of companies
 *     tags: [Company]
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
 *         description: A list of companies.
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/company/{id}:
 *   get:
 *     summary: Retrieve a single company by ID
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the company to retrieve
 *     responses:
 *       200:
 *         description: The company was successfully retrieved
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/company:
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: The company code.
 *                 example: Company Code
 *               name:
 *                 type: string
 *                 description: The company name.
 *                 example: Company Name
 *               erp_Id:
 *                 type: string
 *                 description: The company erp_Id.
 *                 example: Company ERP ID
 *     responses:
 *       201:
 *         description: The company was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/company:
 *   put:
 *     summary: Edit a company
 *     tags: [Company]
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              code:
 *                type: string
 *                description: The company code.
 *                example: Company Code
 *              name:
 *                type: string
 *                description: The company name.
 *                example: Company Name
 *              erp_Id:
 *                type: string
 *                description: The company erp_Id.
 *                example: Company ERP ID
 *     responses:
 *       201:
 *         description: The company was successfully updated
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/company/{id}:
 *   delete:
 *     summary: Delete a company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The UUID of the company to delete
 *     responses:
 *       200:
 *         description: The company was successfully deleted
 *       404:
 *         description: Company not found
 *       500:
 *         description: Server error
 */ 
