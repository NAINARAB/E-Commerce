"use strict";
/**
 * @swagger
 * tags:
 *   name: Product Map
 *   description: Product map management operations
 */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @swagger
 * /api/masters/product/category_map:
 *   post:
 *     summary: Create a new product category map
 *     tags: [Product Map]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product.
 *                 example: 4356789098765645356
 *               category_id:
 *                 type: string
 *                 description: The ID of the category.
 *                 example: 4356789098765645356
 *     responses:
 *       201:
 *         description: The product category map was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/product/category:
 *   post:
 *     summary: Create a new product category map
 *     tags: [Product Map]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               parent_id:
 *                 type: string
 *                 description: The ID of the parent category.
 *                 example: 4356789098765645356
 *               name:
 *                 type: string
 *                 description: The name of the category.
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 description: The description of the category.
 *                 example: Electronics category
 *               sort_order:
 *                 type: number
 *                 description: The sort order of the category.
 *                 example: 1
 *     responses:
 *       201:
 *         description: The product category map was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/product/image:
 *   post:
 *     summary: Create a new product image map
 *     tags: [Product Map]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product.
 *                 example: 4356789098765645356
 *               image_path:
 *                 type: string
 *                 description: The path of the image.
 *                 example: 4356789098765645356
 *               image_name:
 *                 type: string
 *                 description: The name of the image.
 *                 example: image.jpg
 *               image_url:
 *                 type: string
 *                 description: The URL of the image.
 *                 example: https://example.com/image.jpg
 *               is_primary:
 *                 type: boolean
 *                 description: The primary status of the image.
 *                 example: true
 *               sort_order:
 *                 type: number
 *                 description: The sort order of the image.
 *                 example: 1
 *     responses:
 *       201:
 *         description: The product image map was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/product/price:
 *   post:
 *     summary: Create a new product price map
 *     tags: [Product Map]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product.
 *                 example: 4356789098765645356
 *               company_id:
 *                 type: string
 *                 description: The ID of the company.
 *                 example: 4356789098765645356
 *               mrp:
 *                 type: number
 *                 description: The MRP of the product.
 *                 example: 100
 *               selling_price:
 *                 type: number
 *                 description: The selling price of the product.
 *                 example: 100
 *               discount_amount:
 *                 type: number
 *                 description: The discount amount of the product.
 *                 example: 10
 *               discount_percentage:
 *                 type: number
 *                 description: The discount percentage of the product.
 *                 example: 10
 *               effective_from:
 *                 type: string
 *                 description: The effective from date of the product.
 *                 example: 2022-01-01
 *               effective_to:
 *                 type: string
 *                 description: The effective to date of the product.
 *                 example: 2022-01-01
 *     responses:
 *       201:
 *         description: The product price map was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/product/stock:
 *   post:
 *     summary: Create a new product stock map
 *     tags: [Product Map]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product.
 *                 example: 4356789098765645356
 *               company_id:
 *                 type: string
 *                 description: The ID of the company.
 *                 example: 4356789098765645356
 *               shop_id:
 *                 type: number
 *                 description: The ID of the shop.
 *                 example: 100
 *               reserved_stock:
 *                 type: number
 *                 description: The reserved stock of the product.
 *                 example: 100
 *               available_stock:
 *                 type: number
 *                 description: The available stock of the product.
 *                 example: 10
 *               last_stock_sync_at:
 *                 type: string
 *                 description: The last stock sync date of the product.
 *                 example: 2022-01-01
 *     responses:
 *       201:
 *         description: The product stock map was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
/**
 * @swagger
 * /api/masters/product/variant:
 *   post:
 *     summary: Create a new product variant map
 *     tags: [Product Map]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product_id:
 *                 type: string
 *                 description: The ID of the product.
 *                 example: 4356789098765645356
 *               variantName:
 *                 type: string
 *                 description: The name of the variant.
 *                 example: Color
 *               product_data:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: The data of the product.
 *                 example: ["4356789098765645356", "4356789098765645356"]
 *     responses:
 *       201:
 *         description: The product variant map was successfully created
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */ 
