const express = require('express');
const path = require('path');
require('dotenv').config();

const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routerLogin = require('./routes/login');

const routerHome = require('./routes/home');
const routerAddQuestion = require('./routes/questions');
const routerPhone = require('./routes/phone');
const routerOther = require('./routes/other');
const routerCatalogPersonal = require('./routes/catalogPersonal');
const routerCatalogCommercial = require('./routes/catalogCommercial');
const routerCatalogSpecial = require('./routes/catalogSpecial');
const routerMailer = require('./routes/mailer');
const routerPagesList = require('./routes/apiAdmin/pagesList');
const routerTemp = require('./routes/apiAdmin/temp');

const fileMiddleware = require('./middleware/file');
const varMiddleware = require('./middleware/variables');
const errorHandler = require('./middleware/error');

const app = express();

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs',
})

const store = new MongoStore({
    collection: 'sessions',
    uri: process.env.MONGODB_URL,
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

const secret = 'some secret value';

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'temp')));
app.use(express.static(path.join(__dirname, 'adminPublic')));

app.use(express.urlencoded({extended: true}));
app.use(cookieParser(secret));
app.use(session({
    secret: secret,
    resave: true,
    saveUninitialized: true,
    store,
    cookie: {
        secure: false,
        maxAge:  (60*60*1000*24),
    }
}));
app.use(flash());

app.use(varMiddleware);
app.use(fileMiddleware.array('photo'))

app.use('/auth', routerLogin);

app.use('/', routerHome);
app.use('/questions', routerAddQuestion);
app.use('/phone', routerPhone);
app.use('/other', routerOther);
app.use('/catalog/personal/', routerCatalogPersonal);
app.use('/catalog/commercial/', routerCatalogCommercial);
app.use('/catalog/special/', routerCatalogSpecial);
app.use('/mailer', routerMailer);
app.use('/admin', routerPagesList)
app.use('/temp', routerTemp)
app.use('/adminPanel/', errorHandler)
app.use(errorHandler);

const PORT = process.env.PORT;

async function start() {
    try {
        mongoose.connect(process.env.MONGODB_URL, {useNewUrlParser: true})
        app.listen(PORT, () => {
            console.log(`Server is runing on port ${PORT}`)
        })
    } catch(e) {
        console.log(e)
    }
}

start();