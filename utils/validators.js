const {body} = require('express-validator');
// const Phone = require('../models/Phone');

module.exports = {
    phoneValidator : [
        body('phone', 'Необходимо ввести 10 символов').isNumeric().isLength({min: 10, max: 10}).trim(),
        // body('password', 'Минимальная длина пароля 6 символов').isLength({min: 6, max: 32}).isAlphanumeric().trim(),
        // body('confirm').custom((value, {req}) => {
        //     if (value !== req.body.password) {
        //         throw new Error('Пароли не совпадают');
        //     }
        //     return true;
        // })
        // .trim(),
        // body('name').isLength({min: 3}).withMessage('Имя должно быть минимум 3 символа').trim(),
    ],

    // courseValidators: [
    //     body('title').isLength({min: 3}).withMessage('Минимальная длина названия 3 символа').trim(),
    //     body('price').isNumeric().withMessage('Введите коректную цену'),
    //     body('img', 'Введите коректный url картнки').isURL(),
    // ]
}