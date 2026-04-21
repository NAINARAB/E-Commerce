"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jwtAuth_1 = require("./jwtAuth");
function requireAuth(req, res, next) {
    const auth = req.header("Authorization");
    if (!auth?.startsWith("Bearer "))
        return res.status(401).json({ message: "Missing token" });
    const token = auth.substring("Bearer ".length);
    try {
        const payload = (0, jwtAuth_1.verifyJwt)(token);
        req.user = payload;
        next();
    }
    catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}
