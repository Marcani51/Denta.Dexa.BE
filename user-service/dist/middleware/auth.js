"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token)
        res.status(401).json({ message: 'No token, unauthorize' });
    try {
        const decoded = jsonwebtoken_1.default.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: error });
    }
};
exports.auth = auth;
//# sourceMappingURL=auth.js.map