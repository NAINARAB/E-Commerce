import { Router } from "express";
import { changePassword, createUser, deleteUser, getUsers, updateUser } from "../../controller/masters/users/user.controller";
import { paginationData } from "../../middleware/pagination";

const router = Router();

router.get("/", paginationData(['name', 'email', 'mobile', 'userType']), getUsers);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);
router.put("/changePassword", changePassword);


export default router;