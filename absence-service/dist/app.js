"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const api_v1_1 = require("./api_versioning/api_v1");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
dotenv_1.default.config();
app.use((0, cors_1.default)({
    origin: process.env.CORS
    //origin:"https://kost-puce.vercel.app"
}));
app.use(express_1.default.json());
app.use("/v1", api_v1_1.api_v1);
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
app.get("/download/:filename", (req, res) => {
    const filePath = path_1.default.join(__dirname, "../uploads", req.params.filename);
    res.download(filePath, (err) => {
        if (err) {
            res.status(404).send("File tidak ditemukan");
        }
    });
});
exports.App = app;
//# sourceMappingURL=app.js.map