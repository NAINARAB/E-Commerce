/**
 * @swagger
 * tags:
 *   name: Branch
 *   description: Branch management operations
 */

/**
 * @swagger
 * /api/masters/branch:
 *   get:
 *     summary: Retrieve a list of branches
 *     tags: [Branch]
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
 *         description: A list of branches.
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/branch/{id}:
 *   get:
 *     summary: Retrieve a single branch by ID
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the branch to retrieve
 *     responses:
 *       200:
 *         description: The branch was successfully retrieved
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/branch:
 *   post:
 *     summary: Create a new branch
 *     tags: [Branch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_id:
 *                 type: string
 *                 description: The UUID of the company.
 *                 example: 4356789098765645356
 *               code:
 *                 type: string
 *                 description: The branch code.
 *                 example: branch Code
 *               name:
 *                 type: string
 *                 description: The branch name.
 *                 example: branch Name
 *               erp_id:
 *                 type: string
 *                 description: The branch erpId.
 *                 example: branch ERP ID
 *     responses:
 *       201:
 *         description: The branch was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/branch:
 *   put:
 *     summary: Update a branch
 *     tags: [Branch]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The UUID of the branch to update.
 *                 example: 4356789098765645356
 *               company_id:
 *                 type: string
 *                 description: The UUID of the company.
 *                 example: 4356789098765645356
 *               code:
 *                 type: string
 *                 description: The branch code.
 *                 example: branch Code
 *               name:
 *                 type: string
 *                 description: The branch name.
 *                 example: branch Name
 *               erp_id:
 *                 type: string
 *                 description: The branch erpId.
 *                 example: branch ERP ID
 *     responses:
 *       200:
 *         description: The branch was successfully updated
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/branch/{id}:
 *   delete:
 *     summary: Delete a branch
 *     tags: [Branch]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The UUID of the branch to delete
 *     responses:
 *       200:
 *         description: The branch was successfully deleted
 *       404:
 *         description: Branch not found
 *       500:
 *         description: Server error
 */