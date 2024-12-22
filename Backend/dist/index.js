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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const db_1 = require("./db");
const config_1 = require("./config");
const auth_1 = require("./auth");
const app = (0, express_1.default)();
app.post("api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const hashpassword = bcrypt_1.default.hash(password, 5);
    try {
        yield db_1.usermodel.create({
            username: username,
            password: hashpassword
        });
        res.json({ message: "you are singed up" });
    }
    catch (error) {
        res.status(411).json({
            message: "user already exists"
        });
    }
}));
app.post("api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const data = yield db_1.usermodel.findOne(username, password);
    if (data) {
        const Token = jsonwebtoken_1.default.sign({ id: data._id }, config_1.JWT_secret);
        res.json({ token: Token });
    }
    else {
        res.status("incorrect incredential");
    }
}));
app.post("api/v1/content", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.body.type;
    const link = req.body.link;
    const data = yield db_1.contentmodel.create({ type, link, userId: req.userId, tags: [] });
    res.json({ message: "content added" });
}));
app.get("api/v1/content", auth_1.auth, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const result = yield db_1.contentmodel.find({ userId: userId }).populate("userId", "username");
    res.json({ message: result });
}));
app.listen(3000, () => {
    console.log("running on port");
});
