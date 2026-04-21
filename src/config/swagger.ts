import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My API",
            version: "1.0.0",
            description: "API documentation using Swagger",
        },
    },
    apis: [
        path.join(__dirname, "../routes/**/*.{ts,js}"),
        path.join(__dirname, "../controller/**/*.{ts,js}"),
    ],
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };