import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const sendGridAPI = process.env.SENDGRID_API_KEY;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH")
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
    next();
})

app.get('/api', (req, res, next) => {
    res.send("hello world");
})

app.post('/api/email', (req, res, next) => {
    console.log(req.body)
    sgMail.setApiKey(sendGridAPI);
    const msg = {
        to: "zeheng.lin@outlook.com",
        from: req.body.email,
        subject: "Contact Email from website",
        text: req.body.message
    }

    sgMail.send(msg).then((result:any) => {
        res.status(200).json({success: true})
    }).catch((error: Error) => {
        console.log(error)
        res.send({success: false})
    })
})

app.listen(8080, () => {
    console.log("server running on port 8080")
})
