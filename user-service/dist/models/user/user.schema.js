"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.userValidationSchema = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    createdDate: joi_1.default.date().optional().allow(null),
    updateDate: joi_1.default.date().optional().allow(null),
    createdBy: joi_1.default.string().required(),
    updateBy: joi_1.default.string().required(),
    isActive: joi_1.default.boolean().required(),
    roleId: joi_1.default.string().optional().allow(null),
    detail: joi_1.default.object({
        name: joi_1.default.string().required(),
        phone: joi_1.default.string().required(),
        gender: joi_1.default.string().valid("MALE", "FEMALE").required(),
        address: joi_1.default.string().required(),
        position: joi_1.default.string().required(),
        createdDate: joi_1.default.date().optional().allow(null),
        updateDate: joi_1.default.date().optional().allow(null),
        createdBy: joi_1.default.string().required(),
        updateBy: joi_1.default.string().required()
    }).required()
});
//# sourceMappingURL=user.schema.js.map