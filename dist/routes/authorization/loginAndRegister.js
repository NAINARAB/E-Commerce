"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const loginAndRegister_controller_1 = require("../../controller/authorization/loginAndRegister/loginAndRegister.controller");
const router = (0, express_1.Router)();
router.post("/login", loginAndRegister_controller_1.login);
router.post("/register", loginAndRegister_controller_1.register);
exports.default = router;
