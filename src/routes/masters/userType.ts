import { Router } from "express";
import { createUserType, getUserTypes } from "../../controller/masters/userType/userType.controller";
import { paginationData } from "../../middleware/pagination";

const router = Router();

router.post("/", createUserType);
router.get("/", paginationData(['userType', 'alias', 'isActive']), getUserTypes);

export default router;