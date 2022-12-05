"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_js_1 = __importDefault(require("./routes.js"));
const index_1 = __importDefault(require("./models/index"));
const express_session_1 = __importDefault(require("express-session"));
const connect_session_sequelize_1 = __importDefault(require("connect-session-sequelize"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
// parse application/x-www-form-urlencoded
app.use(express_1.default.urlencoded({ extended: true }));
const SequelizeStore = (0, connect_session_sequelize_1.default)(express_session_1.default.Store);
const sequelizeSessionStore = new SequelizeStore({
    db: index_1.default,
    expiration: 1000 * 60 * 60 * 24,
});
app.use(express_1.default.static('./files/imgs'));
app.use((0, express_session_1.default)({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: sequelizeSessionStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    }
}));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(routes_js_1.default);
app.listen(process.env.PORT, () => {
    return console.log(`Express is listening at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=server.js.map