import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/database";
import appRoutes from './routes/routes.index';
import { sequelize } from "./config/sequalizer";
import { swaggerSpec, swaggerUi } from "./config/swagger";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({
    origin: "*",
    // http://localhost:5174
    credentials: true,
}));

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));

connectDB();

(async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.sync({ alter: true });
        console.log('seqalizer initialized');
    } catch (err) {
        console.error('seqalizer initialization failed', err);
    }
})();

app.use('/api', appRoutes);
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});