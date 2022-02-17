const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth');
const Question = require('../models/QuestionsModel');

router.post('/add', auth, async (req, res) => {

    let {title, answer} = req.body;
    
    if (title[title.length-1] !== '?') {
        title = title + '?';
    }

    title = title[0].toUpperCase() + title.substring(1);
    answer = answer[0].toUpperCase() + answer.substring(1);
    
    try {
        const question = new Question({title, answer});

        await question.save();

        await res.status(200).redirect('/');
    } catch(e) {
        console.log(e)
    }
    
})

router.post('/edit', auth, async(req, res) => {

    const {id} = req.body;

    try {

        await Question.findByIdAndUpdate(id, req.body).lean();

        await res.status(200).redirect('/');

    } catch(e) {
        console.log(e)
    }
})

router.delete('/delete/:id', auth, async(req, res) => {
    const id = req.params.id;

    try {
        await Question.deleteOne({
            _id: id
        });
    
        const questions = await Question.find().lean();
    
        await res.status(200).json(questions)
    } catch(e) {
        console.log(e)
    }
})

module.exports = router