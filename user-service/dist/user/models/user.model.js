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
exports.setNewUser = exports.getAllUser = void 0;
const prisma_1 = require("../../../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
//#region
const saveUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.create({
        data: {
            username: body.username,
            password: body.password,
            email: body.email,
            createdDate: new Date(body.createdDate),
            updateDate: new Date(body.updateDate),
            createdBy: body.createdBy,
            updateBy: body.updateBy,
            isActive: body.isActive,
            detail: {
                create: {
                    name: body.detail.name,
                    phone: body.detail.phone,
                    gender: body.detail.gender,
                    address: body.detail.address,
                    position: body.detail.position,
                    createdDate: new Date(body.detail.createdDate),
                    updateDate: new Date(body.detail.updateDate),
                    createdBy: body.detail.createdBy,
                    updateBy: body.detail.updateBy
                }
            }
        }
    });
});
//#endregion
const getAllUser = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdDate: 'desc'
        }
    });
});
exports.getAllUser = getAllUser;
const setNewUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    yield saveUser(user);
});
exports.setNewUser = setNewUser;
//# sourceMappingURL=user.model.js.map