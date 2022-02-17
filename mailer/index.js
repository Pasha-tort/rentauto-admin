require('dotenv').config()

const mailerJS = require("./mailer") 

mailerJS(process.env.EMAIL, process.env.PASSWORD)