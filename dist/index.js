"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const routes_index_1 = __importDefault(require("./routes/routes.index"));
const sequalizer_1 = require("./config/sequalizer");
const swagger_1 = require("./config/swagger");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 7071;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
(0, database_1.connectDB)();
(async () => {
    try {
        await sequalizer_1.sequelize.authenticate();
        await sequalizer_1.sequelize.sync();
        console.log('seqalizer initialized');
    }
    catch (err) {
        console.error('seqalizer initialization failed', err);
    }
})();
app.use('/api', routes_index_1.default);
app.use("/api", (req, res, next) => {
    const protocol = req.headers["x-forwarded-proto"] || req.protocol;
    const host = req.get("host");
    swagger_1.swaggerSpec.servers = [{ url: `${protocol}://${host}` }];
    next();
}, swagger_1.swaggerUi.serve, swagger_1.swaggerUi.setup(swagger_1.swaggerSpec));
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
