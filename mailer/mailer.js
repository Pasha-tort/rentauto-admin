const nodeMailer = require('nodemailer');
require('dotenv').config();

mailerJS = (name=process.env.EMAIL, password=process.env.PASSWORD, message, data) => {
    const transporter = nodeMailer.createTransport({
        host: "smtp.rentauto-motion.ru",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: name, // generated ethereal user
          pass: password, // generated ethereal password
        }
    });

    function applicationFeedback(message, name, phone, email, comments) {
        return `
                <p>${message}</p>
                <p>ФИО клиента: ${name}</p>
                <p>Номер телефона клиента: ${phone}</p>
                <p>Email клиента: ${email}</p>
                <p>Коментарии клиента: ${comments}</p>
            `
    }

    function applicationMachine(message, name, phone, email, comments, machineName) {
        return `
                <p>${message}</p>
                <p>ФИО клиента: ${name}</p>
                <p>Номер телефона клиента: ${phone}</p>
                <p>Email клмента: ${email}</p>
                <p>Коментарии клиента: ${comments}</p>
                <p>Машина: ${machineName}</p>
        `
    }

    function application() {
        if (message === 'Заявка на машину') {
            return applicationMachine(message, data.name, data.phone, data.email, data.comments, data.machineName)
        } else if (message === 'Заявка на обратную связь') {
            return applicationFeedback(message, data.name, data.phone, data.email, data.comments)
        }
    }
    
    const mailOptopns = {
        from: name,
        to: name,
        subject: message,
        text: "Текст письма",
        html: application(), // html body
    }
    
    transporter.sendMail(mailOptopns)
}

module.exports = mailerJS;