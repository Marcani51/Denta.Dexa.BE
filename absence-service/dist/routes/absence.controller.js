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
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpGetAllAbsense = exports.httpGetAllWithUser = exports.httpAddNewAbsence = void 0;
const prisma_1 = require("../../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const httpAddNewAbsence = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "File foto wajib diupload" });
        }
        if (!req.body.userId) {
            return res.status(400).json({ error: "userId wajib diisi" });
        }
        const userId = String(req.body.userId);
        const userExists = yield prisma.user.findUnique({ where: { id: userId } });
        if (!userExists) {
            return res.status(404).json({ error: "User tidak ditemukan" });
        }
        const photoUrl = `/uploads/${req.file.filename}`;
        const absence = yield prisma.absence.create({
            data: {
                userId,
                photoUrl,
                updateDate: new Date(),
                createdDate: new Date(),
            },
        });
        res.status(201).json({
            message: "Absence created successfully",
            data: absence,
        });
    }
    catch (error) {
        console.error("Prisma error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.httpAddNewAbsence = httpAddNewAbsence;
const httpGetAllWithUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.params.id == undefined)
            return res.status(400).json({ message: "user id must included" });
        const userId = String(req.params.id);
        const userExists = yield prisma.user.findUnique({
            where: { id: userId },
            include: { detail: true },
        });
        if (!userExists) {
            return res.status(404).json({ error: "User not exist" });
        }
        const absence = yield prisma.absence.findMany({
            where: { userId: userId },
        });
        return res.status(200).json({
            absence: absence,
            user: userExists,
        });
    }
    catch (err) {
        console.log(err);
    }
});
exports.httpGetAllWithUser = httpGetAllWithUser;
const httpGetAllAbsense = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const absence = yield prisma.absence.findMany({
            include: {
                user: {
                    include: {
                        detail: true,
                    },
                },
            },
        });
        return res.status(200).json(absence);
    }
    catch (err) {
        console.log(err);
    }
});
exports.httpGetAllAbsense = httpGetAllAbsense;
//# sourceMappingURL=absence.controller.js.map