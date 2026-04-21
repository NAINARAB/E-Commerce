"use strict";
/**
 * @swagger
 * tags:
 *   name: Brand
 *   description: Brand management operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * /api/masters/brand:
 *   get:
 *     summary: Retrieve a list of brands
 *     tags: [Brand]
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
 *         description: A list of brands.
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/brand/{id}:
 *   get:
 *     summary: Retrieve a single brand by ID
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the brand to retrieve
 *     responses:
 *       200:
 *         description: The brand was successfully retrieved
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/brand:
 *   post:
 *     summary: Create a new brand
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_id:
 *                 type: string
 *                 description: The ID of the company.
 *                 example: 4356789098765645356
 *               name:
 *                 type: string
 *                 description: The brand name.
 *                 example: Brand 1
 *               erp_id:
 *                 type: string
 *                 description: The ERP ID of the brand.
 *                 example: ERP001
 *     responses:
 *       201:
 *         description: The brand was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/brand:
 *   put:
 *     summary: Update a brand
 *     tags: [Brand]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the brand to update.
 *                 example: 4356789098765645356
 *               company_id:
 *                 type: string
 *                 description: The ID of the company.
 *                 example: 4356789098765645356
 *               name:
 *                 type: string
 *                 description: The brand name.
 *                 example: Brand 1
 *               erp_id:
 *                 type: string
 *                 description: The ERP ID of the brand.
 *                 example: ERP001
 *     responses:
 *       200:
 *         description: The brand was successfully updated
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/brand/{id}:
 *   delete:
 *     summary: Delete a brand
 *     tags: [Brand]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the brand to delete
 *     responses:
 *       200:
 *         description: The brand was successfully deleted
 *       404:
 *         description: Brand not found
 *       500:
 *         description: Server error
 */
