"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const auth_schema_1 = require("../models/auth.schema");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = require("../../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const { error } = (0, auth_schema_1.loginValidation)(req.body.value);
    if (error)
        return res.status(400).json({
            message: error,
        });
    const userDb = yield prisma.user.findFirst({
        where: {
            AND: [{ username: req.body.username }, { password: req.body.password }],
        },
        include: { detail: true }
    });
    if (!userDb)
        return res.status(401).json({
            data: "Username and Password incorrect",
            code: 401,
        });
    if (!userDb.isActive)
        return res.status(401).json({
            data: "Account is not actived, contact your admin",
            code: 401,
        });
    try {
        const token = jsonwebtoken_1.default.sign({ user: { id: userDb.id } }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 100000 });
        res.status(200).json({ token: token, data: userDb });
    }
    catch (er) {
        res.status(400).send({ message: error });
    }
});
exports.login = login;
//# sourceMappingURL=auth.controller.js.map