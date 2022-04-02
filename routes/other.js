const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth');
const Advantage = require('../models/Advantages');
const CatalogHomeItem = require('../models/CatalogHomeItem');
const Exchange = require('../models/Exchange');
const CatalogTitle = require('../models/CatalogTitle');

router.post('/advantages/add', auth, async(req, res) => {

    const {title, field} = req.body;

    try {
        const advantageDB = new Advantage({title, field});
        await advantageDB.save();

        await res.status(200).redirect('/');
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
});

router.post('/advantages/edit', auth, async(req, res) => {
    const {id} = req.body;

    try {
        await Advantage.findByIdAndUpdate(id, req.body).lean();

        await res.status(200).redirect('/');
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }

    
});

router.post('/catalog-home/add', auth, async(req, res) => {

    const {title, field} = req.body;
    
    try {
        const catalogHomeItem = new CatalogHomeItem({title, field});
        await catalogHomeItem.save();

        await res.status(200).redirect('/');
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
});

router.post('/catalog-home/edit', auth, async(req, res) => {
    const {id} = req.body;

    try {
        await CatalogHomeItem.findByIdAndUpdate(id, req.body).lean();

        await res.status(200).redirect('/');
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
});

router.post('/exchange/add', async(req, res) => {
    const {field} = req.body;

    try {
        const exchange = await new Exchange({field});
        exchange.save();
        res.redirect('/');
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
});

router.post('/exchange/edit', async(req, res) => {
    const {field, id} = req.body;

    try {
        await Exchange.findByIdAndUpdate(id, {field});
        res.redirect('/');
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
});

router.post('/catalog-title/edit', async(req, res) => {
    const {pageName, title, type, id, prevUrl} = req.body;
    
    try {
        await CatalogTitle.findByIdAndUpdate(id, {pageName, title, type});
        
        res.redirect(prevUrl);
    } catch(e) {
        console.log(e);
		res.status(500).json();
    }
});

module.exports = router