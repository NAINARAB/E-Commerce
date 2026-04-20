import { Router } from "express";
import { changePassword, createUser, deleteUser, getUserById, getUsers, updateUser } from "../../controller/masters/users/user.controller";
import { paginationData } from "../../middleware/pagination";

const router = Router();

router.get("/", paginationData(['name', 'email', 'mobile', 'userType', 'is_active']), getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.put("/changePassword", changePassword);



export default router;