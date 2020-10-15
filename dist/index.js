"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mail_1 = __importDefault(require("@sendgrid/mail"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sendGridAPI = process.env.SENDGRID_API_KEY;
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.get('/api', (req, res, next) => {
    res.send("hello world");
});
app.post('/api/email', (req, res, next) => {
    console.log(req.body);
    mail_1.default.setApiKey(sendGridAPI);
    const msg = {
        to: "zeheng.lin@outlook.com",
        from: req.body.email,
        subject: "Contact Email from website",
        text: req.body.message
    };
    mail_1.default.send(msg).then((result) => {
        res.status(200).json({ success: true });
    }).catch((error) => {
        console.log(error);
        res.send({ success: false });
    });
});
app.listen(8080, () => {
    console.log("server running on port 8080");
});
//# sourceMappingURL=index.js.map