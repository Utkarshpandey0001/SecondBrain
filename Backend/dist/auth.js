"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("./config");
const auth = (req, res, next) => {
    const header = req.headers["authorization"];
    const response = jsonwebtoken_1.default.verify(header, config_1.JWT_secret);
    if (response) {
        //@ts-ignore
        req.userId = response.id;
        next();
    }
    else {
        res.status(403).json({ message: "wrong credentials" });
    }
};
exports.auth = auth;
