"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const nodemailer_sendgrid_1 = __importDefault(require("nodemailer-sendgrid"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const transport = nodemailer_1.default.createTransport(nodemailer_sendgrid_1.default({ apiKey: process.env.SENDGRID_API_KEY }));
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
    const msg = {
        to: "zeheng.lin@outlook.com",
        from: "matthewwantscs@gmail.com",
        subject: `Contact Email from ${req.body.name} with email: ${req.body.email}`,
        text: req.body.message
    };
    transport.sendMail(msg).then((result) => {
        res.json({ success: true });
    }).catch((err) => {
        console.log(err);
        if (err.response && err.response.body && err.response.body.errors) {
            err.response.body.errors.forEach((error) => console.log('%s: %s', error.field, error.message));
        }
        else {
            console.log(err);
        }
        res.send({ success: false });
    });
});
app.listen(8080, () => {
    console.log("server running on port 8080");
});
//# sourceMappingURL=index.js.map