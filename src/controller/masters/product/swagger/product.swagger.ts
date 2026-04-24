
/**
 * @swagger
 * /api/masters/product:
 *   get:
 *     summary: Retrieve a list of products
 *     tags: [api/masters/product]
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
 *         description: A list of products.
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/product/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     tags: [api/masters/product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to retrieve
 *     responses:
 *       200:
 *         description: The product was successfully retrieved
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/product:
 *   post:
 *     summary: Create a new product
 *     tags: [api/masters/product]
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
 *               brand_id:
 *                 type: string
 *                 description: The ID of the brand.
 *                 example: 4356789098765645356
 *               product_code:
 *                 type: string
 *                 description: The product code.
 *                 example: P001
 *               product_name:
 *                 type: string
 *                 description: The product name.
 *                 example: Product 1
 *               short_name:
 *                 type: string
 *                 description: The short name of the product.
 *                 example: P1
 *               product_description:
 *                 type: string
 *                 description: The description of the product.
 *                 example: Description 1
 *               hsn_code:
 *                 type: string
 *                 description: The HSN code of the product.
 *                 example: HSN001
 *               units:
 *                 type: string
 *                 description: The units of the product.
 *                 example: Units 1
 *               pack_id:
 *                 type: string
 *                 description: The pack ID of the product.
 *                 example: Pack 1
 *               gst_p:
 *                 type: number
 *                 description: The GST percentage of the product.
 *                 example: 18
 *               cgst_p:
 *                 type: number
 *                 description: The CGST percentage of the product.
 *                 example: 9
 *               sgst_p:
 *                 type: number
 *                 description: The SGST percentage of the product.
 *                 example: 9
 *               igst_p:
 *                 type: number
 *                 description: The IGST percentage of the product.
 *                 example: 18
 *               product_rate:
 *                 type: number
 *                 description: The rate of the product.
 *                 example: 100
 *               max_rate:
 *                 type: number
 *                 description: The maximum rate of the product.
 *                 example: 120
 *               selling_rate:
 *                 type: number
 *                 description: The selling rate of the product.
 *                 example: 110
 *               erp_id:
 *                 type: string
 *                 description: The ERP ID of the product.
 *                 example: ERP001
 *     responses:
 *       201:
 *         description: The product was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/product/:
 *   put:
 *     summary: Update a product
 *     tags: [api/masters/product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the product to update.
 *                 example: 4356789098765645356
 *               company_id:
 *                 type: string
 *                 description: The ID of the company.
 *                 example: 4356789098765645356
 *               brand_id:
 *                 type: string
 *                 description: The ID of the brand.
 *                 example: 4356789098765645356
 *               product_code:
 *                 type: string
 *                 description: The product code.
 *                 example: P001
 *               product_name:
 *                 type: string
 *                 description: The product name.
 *                 example: Product 1
 *               short_name:
 *                 type: string
 *                 description: The short name of the product.
 *                 example: P1
 *               product_description:
 *                 type: string
 *                 description: The description of the product.
 *                 example: Description 1
 *               hsn_code:
 *                 type: string
 *                 description: The HSN code of the product.
 *                 example: HSN001
 *               units:
 *                 type: string
 *                 description: The units of the product.
 *                 example: Units 1
 *               pack_id:
 *                 type: string
 *                 description: The pack ID of the product.
 *                 example: Pack 1
 *               gst_p:
 *                 type: number
 *                 description: The GST percentage of the product.
 *                 example: 18
 *               cgst_p:
 *                 type: number
 *                 description: The CGST percentage of the product.
 *                 example: 9
 *               sgst_p:
 *                 type: number
 *                 description: The SGST percentage of the product.
 *                 example: 9
 *               igst_p:
 *                 type: number
 *                 description: The IGST percentage of the product.
 *                 example: 18
 *               product_rate:
 *                 type: number
 *                 description: The rate of the product.
 *                 example: 100
 *               max_rate:
 *                 type: number
 *                 description: The maximum rate of the product.
 *                 example: 120
 *               selling_rate:
 *                 type: number
 *                 description: The selling rate of the product.
 *                 example: 110
 *               erp_id:
 *                 type: string
 *                 description: The ERP ID of the product.
 *                 example: ERP001
 *     responses:
 *       200:
 *         description: The product was successfully updated
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/masters/product/{id}:
 *   delete:
 *     summary: Delete a product
 *     tags: [api/masters/product]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the product to delete
 *     responses:
 *       200:
 *         description: The product was successfully deleted
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server error
 */
