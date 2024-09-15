const { createTransport }= require('nodemailer')
const { objConf } = require('../config/index.js');

const { 
    gmail_pass, 
    gmail_user } = objConf

const transport = createTransport({
    service: 'gmail',
    port: 578,
    auth: {
        user: gmail_user,
        pass: gmail_pass
    }
})

exports.sendEmail = async ({userMail, subject, html}) => {
    return await transport.sendEmail({
        from: 'Prueba <backend.evelyn2024@gmail.com>',
        to: userMail,
        subject,
        html
    })
}