/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management operations
 */

/**
 * @swagger
 * /api/masters/users:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Users]
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
 *         description: A list of users.
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/users/{id}:
 *   get:
 *     summary: Retrieve a single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve
 *     responses:
 *       200:
 *         description: The user was successfully retrieved
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userType:
 *                 type: string
 *                 description: The UUID of the user type.
 *                 example: 4356789098765645356
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

/**
 * @swagger
 * /api/masters/users:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The UUID of the user to update.
 *                 example: 4356789098765645356
 *               userType:
 *                 type: string
 *                 description: The UUID of the user type.
 *                 example: 4356789098765645356
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
 *     responses:
 *       200:
 *         description: The user was successfully updated
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The UUID of the user to delete
 *     responses:
 *       200:
 *         description: The user was successfully deleted
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/users/changePassword:
 *   put:
 *     summary: Change user password
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The UUID of the user.
 *                 example: 4356789098765645356
 *               oldPassword:
 *                 type: string
 *                 description: The user's current password.
 *                 example: securePassword123
 *               newPassword:
 *                 type: string
 *                 description: The user's new password.
 *                 example: newSecurePassword123
 *     responses:
 *       200:
 *         description: Password was successfully changed
 *       400:
 *         description: Invalid input data or incorrect old password
 *       404:
 *         description: User not found
 *       500:
 *         description: Server error
 */