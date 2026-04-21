"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginAndRegister_1 = __importDefault(require("./loginAndRegister"));
const router = (0, express_1.Router)();
router.use("/loginAndRegister", loginAndRegister_1.default);
exports.default = router;
