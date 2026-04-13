import { Router } from "express";
import loginAndRegisterRoutes from "./loginAndRegister";

const router = Router();

router.use("/loginAndRegister", loginAndRegisterRoutes);

export default router;