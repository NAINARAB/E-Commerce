import { Router } from "express";
import usersRoutes from "./users.routes";
import userTypeRoutes from "./userType";

const router = Router();

router.use("/users", usersRoutes);
router.use("/userType", userTypeRoutes);

export default router;