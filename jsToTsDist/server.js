"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = (0, express_1.default)();
// Access to .env file
// parse application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use(cookieParser());
app.use(express_1.default.json());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.listen(process.env.PORT, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map