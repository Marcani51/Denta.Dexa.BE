"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.roleValidationSchema = joi_1.default.object({
    roleName: joi_1.default.string().min(3).max(50).required(),
    isActive: joi_1.default.boolean().required(),
    createdDate: joi_1.default.date().optional(),
    updateDate: joi_1.default.date().optional(),
    createdBy: joi_1.default.string().required(),
    updateBy: joi_1.default.string().required(),
    access: joi_1.default.object({
        view: joi_1.default.boolean().required(),
        edit: joi_1.default.boolean().required(),
        absent: joi_1.default.boolean().required(),
        roleId: joi_1.default.string().optional()
    }).optional()
});
//# sourceMappingURL=role.schema.js.map