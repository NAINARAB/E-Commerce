import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import appRoutes from './routes/routes.index';
import { sequelize } from "./config/sequalizer";
import { swaggerSpec, swaggerUi } from "./config/swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 7071;

app.use(cors());

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

connectDB();

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log('seqalizer initialized');
    } catch (err) {
        console.error('seqalizer initialization failed', err);
    }
})();

app.use('/api', appRoutes);

app.use("/api", (req: Request, res: Response, next: NextFunction) => {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    const host = req.get("host");
    swaggerSpec.servers = [{ url: `${protocol}://${host}` }];
    next();
}, swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});