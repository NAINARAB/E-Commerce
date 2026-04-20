import { Router } from "express";
import { createBrand, deleteBrand, getBrandById, getBrands, updateBrand } from "../../controller/masters/product/brand.controller";
import { paginationData } from "../../middleware/pagination";

const router = Router();

router.get("/", paginationData(['name', 'company_id', 'is_active']), getBrands);
router.get("/:id", getBrandById);
router.post("/", createBrand);
router.put("/", updateBrand);
router.delete("/", deleteBrand);

export default router;