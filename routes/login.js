const {Router} = require('express');
const router = Router();
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');

const Admin = require('../models/Admin');

const pathPublic = path.resolve(path.dirname(__dirname)) + '/public';

router.get('/login', async(req, res) => {
    const isLogin = true;
    try {

		function readFiles(path) {
			return new Promise((res, rej) => {
				fs.readdir(path, (err, files) => {
					if (err) {
						rej()
					} else {
						res(files)
					}
				});
			})
		}

		let fileScript = null;

		await readFiles(pathPublic)
			.then(res => {
				files = res.forEach((file) => {
					if (/^auth\.\w+.js$/g.test(file)) {
						fileScript = file;
					}
				})
			})

        res.render('login', {
           error: req.flash('error'),
		   fileScript,
           isLogin,
		   layout: 'auth',
        });
    } catch(e) {
        console.log(e);
		res.status(404).render('404', {
			title: 'Страница не найдена'
		})
    }
});

router.get('/logout', auth, async(req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('/auth/login');
        });
    } catch(e) {
        console.log(e);
		res.status(500).json();
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
        console.log(e);
		res.status(404).render('404', {
			title: 'Страница не найдена'
		})
    }
});

module.exports = router;