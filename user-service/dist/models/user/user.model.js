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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getAllUser = exports.updateUser = exports.saveUser = void 0;
const prisma_1 = require("../../../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
//#region
const saveUser = (body) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.create({
        data: {
            username: body.username,
            password: body.password,
            email: body.email,
            createdDate: new Date(),
            updateDate: new Date(),
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
exports.saveUser = saveUser;
const updateUser = (dataUser, userid) => __awaiter(void 0, void 0, void 0, function* () {
    const { detail } = dataUser, userData = __rest(dataUser, ["detail"]);
    const updateUserDB = yield prisma.user.update({
        where: { id: userid },
        data: Object.assign(Object.assign({}, userData), { detail: detail
                ? {
                    update: Object.assign({}, detail)
                }
                : undefined }),
        include: { detail: true }
    });
    return updateUserDB;
});
exports.updateUser = updateUser;
//#endregion
const getAllUser = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdDate: 'desc'
        },
        include: { detail: true }
    });
});
exports.getAllUser = getAllUser;
const getUserById = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma.user.findUnique({
        where: { id: userId },
        include: { detail: true }
    });
    return exist;
});
exports.getUserById = getUserById;
//# sourceMappingURL=user.model.js.map