import { Router } from "express";
import { createCategory, deleteCategory, getCategoryById, getCategories, updateCategory } from "../../controller/masters/product/category.controller";

const router = Router();

router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", createCategory);
router.put("/", updateCategory);
router.delete("/", deleteCategory);

export default router;
