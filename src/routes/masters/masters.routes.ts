import { Router } from "express";
import usersRoutes from "./users.routes";
import companyRoutes from "./company.routes";
import branchRoutes from "./branch.routes";
import productRoutes from './products.routes';
import brandRoutes from './brand.routes'
import categoryRoutes from './category.routes'

const router = Router();

router.use("/users", usersRoutes);
router.use("/company", companyRoutes);
router.use("/branch", branchRoutes);
router.use('/brand', brandRoutes);
router.use('/product', productRoutes);
router.use('/product/category', categoryRoutes);

export default router;