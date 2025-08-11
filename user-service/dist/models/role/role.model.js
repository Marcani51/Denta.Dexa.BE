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
exports.updateRole = exports.getRoleById = exports.getAllRole = exports.saveRole = void 0;
const prisma_1 = require("../../../../generated/prisma");
const prisma = new prisma_1.PrismaClient();
const saveRole = (body) => __awaiter(void 0, void 0, void 0, function* () {
    if (!body.access)
        throw new Error("Access object is required");
    yield prisma.role.create({
        data: {
            roleName: body.roleName,
            isActive: body.isActive,
            createdDate: new Date(),
            updateDate: new Date(),
            createdBy: body.createdBy,
            updateBy: body.updateBy,
            access: {
                create: {
                    view: Boolean(body.access.view),
                    edit: Boolean(body.access.edit),
                    absent: Boolean(body.access.absent),
                },
            },
        },
    });
});
exports.saveRole = saveRole;
const getAllRole = (skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.role.findMany({
        skip: skip,
        take: limit,
        orderBy: {
            createdDate: "desc",
        },
        include: { access: true }
    });
});
exports.getAllRole = getAllRole;
const getRoleById = (roleid) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.role.findUnique({
        where: { id: roleid },
        include: { access: true },
    });
});
exports.getRoleById = getRoleById;
const updateRole = (dataRole, roleId) => __awaiter(void 0, void 0, void 0, function* () {
    const { access } = dataRole, roleData = __rest(dataRole, ["access"]);
    const updateRoleDB = yield prisma.role.update({
        where: { id: roleId },
        data: Object.assign(Object.assign({}, roleData), { updateDate: new Date(), access: access
                ? {
                    upsert: {
                        update: {
                            view: access.view,
                            edit: access.edit,
                            absent: access.absent,
                        },
                        create: {
                            view: access.view,
                            edit: access.edit,
                            absent: access.absent,
                        },
                    },
                }
                : undefined }),
        include: { access: true },
    });
    return updateRoleDB;
});
exports.updateRole = updateRole;
//# sourceMappingURL=role.model.js.map