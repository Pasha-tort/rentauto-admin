const {Router} = require('express');
const router = Router();
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const Admin = require('../models/Admin');

router.get('/login', async(req, res) => {
    const isLogin = true;
    try {
        res.render('login', {
           error: req.flash('error'),
           isLogin,
        });
    } catch(e) {
        console.log(e);
    }
});

router.get('/logout', auth, async(req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/auth/login');
        });
    } catch(e) {
        console.log(e);
    }
});

router.post('/login', async(req, res) => {
    try {
        const {login, password} = req.body;
        const candidate = await Admin.findOne({login});

        if (candidate) {
            const areSame = await bcrypt.compare(password, candidate.password);

            if (areSame) {
                const admin = candidate;
                req.session.admin = admin;
                req.session.isAuthenticated = true;
                req.session.save(err => {
                    if (err) {
                        throw err
                    } else {
                        res.redirect('/');
                    }
                });
            } else {
                req.flash('error', 'Неверные данные авторизации');
                res.redirect('/auth/login');
            }
        } else {
            req.flash('error', 'Неверные данные авторизации');
            res.redirect('/auth/login');
        }
    } catch(e) {
        console.log(e)
    }
});

module.exports = router;