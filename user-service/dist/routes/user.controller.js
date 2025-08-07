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
exports.httpCreateUser = exports.httpGetUser = void 0;
let users = [];
const httpGetUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json({
        error: "User Doesn't exist",
    });
});
exports.httpGetUser = httpGetUser;
const httpCreateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    console.log(user);
    res.status(201).json(user);
});
exports.httpCreateUser = httpCreateUser;
//# sourceMappingURL=user.controller.js.map