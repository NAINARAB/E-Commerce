"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.sequelize = new sequelize_1.Sequelize({
    dialect: 'mssql',
    host: process.env.SERVER,
    username: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    logging: false,
    dialectOptions: {
        options: {
            encrypt: false,
            trustedConnection: true,
            trustServerCertificate: true,
            requestTimeout: 60000,
        }
    }
});
