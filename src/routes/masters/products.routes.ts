import { Router } from "express";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../../controller/masters/product/product.controller";
import { paginationData } from "../../middleware/pagination";
import { addCategoryMap, addProductImage, addProductPrice, addProductStock, addProductVariant } from "../../controller/masters/product/product_map.controller";

const router = Router();

router.get("/", paginationData([ 
    'brand_id', 'company_id', 'product_name', 'product_code', 'product_rate', 
    'selling_rate', 'max_rate', 'is_active'
]), getProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.put("/", updateProduct);
router.delete("/", deleteProduct);

router.use("/category_map", addCategoryMap);
router.use("/price", addProductPrice);
router.use("/image", addProductImage);
router.use("/stock", addProductStock);
router.use("/variant", addProductVariant);

export default router;