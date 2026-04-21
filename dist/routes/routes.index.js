"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const masters_routes_1 = __importDefault(require("./masters/masters.routes"));
const authorization_routes_1 = __importDefault(require("./authorization/authorization.routes"));
const router = (0, express_1.Router)();
router.use("/masters", masters_routes_1.default);
router.use("/authorization", authorization_routes_1.default);
exports.default = router;
