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
exports.httpUpdateRole = exports.httpGetRoleById = exports.httpGetAllRole = exports.httpAddNewRole = void 0;
const query_1 = require("../../utilities/query");
const commonfunction_1 = require("../../utilities/commonfunction");
const roleFunction = __importStar(require("../../models/role/index"));
const editRequireMentCheck = (roleId, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!roleId) {
        return res.status(400).json({
            error: "ID must be included",
        });
    }
    const isExist = yield roleFunction.getRoleById(roleId);
    return isExist;
});
const httpAddNewRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = req.body;
        yield roleFunction.saveRole(role);
        return res.status(200).json(role);
    }
    catch (err) {
        (0, commonfunction_1.errorHandling)(err, req, res);
    }
});
exports.httpAddNewRole = httpAddNewRole;
const httpGetAllRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { skip, limit } = (0, query_1.getPagination)(req.query);
        if (req.query.search != undefined) {
            /// param search
            console.log("MASUK KOK");
            return res.status(200).json(req.query.search);
        }
        else {
            const role = yield roleFunction.getAllRole(skip, limit);
            return res.status(200).json(role);
        }
    }
    catch (er) {
        (0, commonfunction_1.errorHandling)(er, req, res);
    }
});
exports.httpGetAllRole = httpGetAllRole;
const httpGetRoleById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const roleId = req.params.id;
        const isRoleExist = yield roleFunction.getRoleById(roleId);
        if (!isRoleExist)
            return res.status(404).json({
                error: "Role doesn exist",
            });
        else
            res.status(200).json(isRoleExist);
    }
    catch (er) {
        (0, commonfunction_1.errorHandling)(er, req, res);
    }
});
exports.httpGetRoleById = httpGetRoleById;
const httpUpdateRole = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const role = req.body;
        const roleId = req.params.id;
        const isExist = yield editRequireMentCheck(roleId, res);
        if (!isExist)
            return res.status(404).json({ message: "role not found" });
        const updateData = Object.assign(Object.assign({}, role), { updateDate: new Date() });
        if (req.body.access) {
            updateData.access = role.access;
        }
        const update = yield roleFunction.updateRole(updateData, roleId);
        return res.status(200).json(update);
    }
    catch (er) {
        (0, commonfunction_1.errorHandling)(er, req, res);
    }
});
exports.httpUpdateRole = httpUpdateRole;
//# sourceMappingURL=role.controller.js.map