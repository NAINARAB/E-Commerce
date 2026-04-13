import { Router } from "express";
import masterRoutes from "./masters/masters.routes";
import authorizationRoutes from "./authorization/authorization.routes";

const router = Router();

router.use("/masters", masterRoutes);
router.use("/authorization", authorizationRoutes);

export default router;