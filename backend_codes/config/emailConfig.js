import dotenv from 'dotenv'
dotenv.config()
import nodemailer from 'nodemailer'

//setting up nodemailer --> mailing system
let transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for other ports
  auth: {
    type:"OAuth2",
    user: process.env.EMAIL_USER, // Admin Gmail ID
    pass: process.env.EMAIL_PASS, // Admin Gmail Password
    clientId: process.env.CLIENTID,
    clientSecret: process.env.CLIENTSECRET,
    accessToken: ""
  },
  tls: {
    rejectUnauthorized: false
},
})

export default transporter