import express from 'express';
import cors from 'cors';
import sgMail from '@sendgrid/mail';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();
const SENDGRID_API_KEY =  process.env.SENDGRID_API_KEY;
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
    sgMail.setApiKey(SENDGRID_API_KEY)
    const msg = {
        to: "zeheng.lin@outlook.com",
        from: "matthewwantscs@gmail.com",
        subject: `Contact Email from ${req.body.name} with email: ${req.body.email}` ,
        text: req.body.message
    }

    sgMail.send(msg).then((result:any) => {
        res.json({success: true})
    }).catch((err: any) => {
        console.log(err)
        if (err.response && err.response.body && err.response.body.errors) {
            err.response.body.errors.forEach((error:any) => console.log('%s: %s', error.field, error.message));
        } else {
            console.log(err);
        }
        res.send({success: false})
    })
})

app.listen(8080, () => {
    console.log("server running on port 8080")
})
