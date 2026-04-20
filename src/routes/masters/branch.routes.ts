import { Router } from "express";
import { paginationData } from "../../middleware/pagination";
import { getAllBranches, getBranchById, createBranch, updateBranch, deleteBranch } from "../../controller/masters/company/branch.controller";


const router = Router();

router.get("/", paginationData(['name', 'is_active', 'code']), getAllBranches);
router.get("/:id", getBranchById);
router.post("/", createBranch);
router.put("/", updateBranch);
router.delete("/", deleteBranch);

export default router;