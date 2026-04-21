"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = require("../../controller/masters/product/product.controller");
const pagination_1 = require("../../middleware/pagination");
const product_map_controller_1 = require("../../controller/masters/product/product_map.controller");
const router = (0, express_1.Router)();
router.get("/", (0, pagination_1.paginationData)([
    'brand_id', 'company_id', 'product_name', 'product_code', 'product_rate',
    'selling_rate', 'max_rate', 'is_active'
]), product_controller_1.getProducts);
router.get("/:id", product_controller_1.getProductById);
router.post("/", product_controller_1.createProduct);
router.put("/", product_controller_1.updateProduct);
router.delete("/", product_controller_1.deleteProduct);
router.use("/category_map", product_map_controller_1.addCategoryMap);
router.use("/price", product_map_controller_1.addProductPrice);
router.use("/image", product_map_controller_1.addProductImage);
router.use("/stock", product_map_controller_1.addProductStock);
router.use("/variant", product_map_controller_1.addProductVariant);
exports.default = router;
