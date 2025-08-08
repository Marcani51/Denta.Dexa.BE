"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressError = exports.func = void 0;
exports.errorHandling = errorHandling;
function errorHandling(er, req, res) {
    return res.status(400).json({
        message: er,
        code: 400,
        status: "FAILED"
    });
}
const func = (func) => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
exports.func = func;
class ExpressError extends Error {
    constructor(message, statusCode) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }
}
exports.ExpressError = ExpressError;
//# sourceMappingURL=commonfunction.js.map