

const express = require('express')
const nodemailer = require('nodemailer')
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());

const port = 3000
const user = "rykelmesteven@outlook.com"
const pass = "Rykelme1504"


app.get('/', (req, res) => res.send('Hello World!'))

app.post('/send', (req, res) => {
    console.log(req)
    const reqBody = req.body
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: "587",
        auth: {
            user: user,
            pass: pass
        }
    });

    transporter.sendMail({
        from: user,
        to: user,
        replyTo: reqBody.email,
        subject: reqBody.subject,
        text: `${reqBody.name} => ` + reqBody.message
    }).then(info => {
        res.send(info)
    }).catch(error => {
        res.send(error)
    })

})

app.listen(port, () => console.log('Running on port ' + port))