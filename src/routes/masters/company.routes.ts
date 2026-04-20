import { Router } from "express";
import { paginationData } from "../../middleware/pagination";
import { 
    getCompanyById, 
    getAllCompanies, 
    createCompany, 
    updateCompany, 
    deleteCompany 
} from "../../controller/masters/company/company.controller";

const router = Router();

router.get("/", paginationData(['name', 'is_active', 'code']), getAllCompanies);
router.get("/:id", getCompanyById);
router.post("/", createCompany);
router.put("/", updateCompany);
router.delete("/", deleteCompany);

export default router;