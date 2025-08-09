"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
exports.httpGetUserById = exports.httpDeleteUser = exports.httpUpdateUser = exports.httpGetAllUser = exports.httpAddNewUser = void 0;
const query_1 = require("../../utilities/query");
const userFunction = __importStar(require("../../models/user/user.model"));
const commonfunction_1 = require("../../utilities/commonfunction");
const editRequireMentCheck = (userId, req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userId) {
        return res.status(400).json({
            error: "ID must be included",
        });
    }
    const isExist = yield userFunction.getUserById(userId);
    return isExist;
});
const httpAddNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        yield userFunction.saveUser(user);
        return res.status(200).json(user);
    }
    catch (err) {
        (0, commonfunction_1.errorHandling)(err, req, res);
    }
});
exports.httpAddNewUser = httpAddNewUser;
const httpGetAllUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit } = (0, query_1.getPagination)(req.query);
        if (req.query.search != undefined) {
            console.log(req.query.search);
            console.log("WAH PARAM");
            return res.status(200).json(req.query.search);
        }
        else {
            const user = yield userFunction.getAllUser(skip, limit);
            return res.status(200).json(user);
        }
    }
    catch (err) {
        (0, commonfunction_1.errorHandling)(err, req, res);
    }
});
exports.httpGetAllUser = httpGetAllUser;
const httpUpdateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const userId = req.params.id;
        const isExist = yield editRequireMentCheck(userId, req, res);
        if (!isExist)
            return res.status(404).json({ message: "User not found" });
        const updateData = Object.assign(Object.assign({}, user), { updateDate: new Date() });
        if (req.body.details) {
            updateData.detail = {
                update: Object.assign(Object.assign({}, user.detail), { updateDate: new Date() }),
            };
        }
        const update = yield userFunction.updateUser(updateData, userId);
        return res.status(200).json(update);
    }
    catch (err) {
        (0, commonfunction_1.errorHandling)(err, req, res);
    }
});
exports.httpUpdateUser = httpUpdateUser;
const httpDeleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const isExist = yield editRequireMentCheck(userId, req, res);
        if (!isExist)
            return res.status(404).json({ message: "User not found" });
        const deleteData = {
            username: isExist.username,
            password: isExist.password,
            email: isExist.email,
            roleId: isExist.roleId,
            detailId: isExist.detailId,
            createdDate: isExist.createdDate,
            createdBy: isExist.createdBy,
            updateBy: isExist.updateBy,
            updateDate: new Date(),
            isActive: false,
        };
        const deleteDb = yield userFunction.updateUser(deleteData, userId);
        return res.status(200).json(deleteDb);
    }
    catch (err) {
        (0, commonfunction_1.errorHandling)(err, req, res);
    }
});
exports.httpDeleteUser = httpDeleteUser;
const httpGetUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const userIsEsist = yield userFunction.getUserById(userId);
    if (!userIsEsist)
        return res.status(404).json({ message: "User not found" });
    else
        return res.status(200).json(userIsEsist);
});
exports.httpGetUserById = httpGetUserById;
//# sourceMappingURL=user.controller.js.map