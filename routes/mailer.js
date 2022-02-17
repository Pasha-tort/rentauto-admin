const {Router} = require('express');
const router = Router();
const mailerJS = require('../mailer/mailer');
require('dotenv').config();

const MachinePersonal = require('../models/MachinePersonal');
const MachineCommercial = require('../models/MachineCommercial');
const MachineSpecial = require('../models/MachineSpecial');


router.post('/feedback', async(req, res) => {
    try {
        const data = req.body;
        const message = 'Заявка на обратную связь';

        await mailerJS(process.env.EMAIL, process.env.PASSWORD, message, data);
        await res.json();
    } catch(e) {
        console.log(e)
    }
});

router.post('/machine', async(req, res) => {

    try {

        const data = req.body;
        const {type} = req.body;
        const {idMachine} = req.body;

        const dataMailer = data;

        if (type === 'personal') {
            const nameMachine = await MachinePersonal.findById(idMachine).lean().select('nameMachine');
            dataMailer.machineName = nameMachine.nameMachine;
        } else if (type === 'commercial') {
            const nameMachine = await MachineCommercial.findById(idMachine).lean().select('nameMachine');
            dataMailer.machineName = nameMachine.nameMachine;
        } else if (type === 'special') {
            const nameMachine = await MachineSpecial.findById(idMachine).lean().select('nameMachine');
            dataMailer.machineName = nameMachine.nameMachine;
        }

        const message = 'Заявка на машину';

        await mailerJS(process.env.EMAIL, process.env.PASSWORD, message, data);
        await res.json();

    } catch(e) {
        console.log(e)
    }
})



module.exports = router;