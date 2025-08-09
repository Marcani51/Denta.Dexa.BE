"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api_v1 = void 0;
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../routes/auth.route");
const api = express_1.default.Router();
api.use('/login', auth_route_1.AuthRoute);
exports.api_v1 = api;
//# sourceMappingURL=api_v1.js.map