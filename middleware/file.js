const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        const url = req.originalUrl.match(/\/\w+\/\w+\//g)[0];
        let urlImg = null;
        switch(url) {
            case '/catalog/personal/':
                urlImg = 'assets/img/catalog/personal/machines';
                break;
            case '/catalog/commercial/':
                urlImg = 'assets/img/catalog/commercial/machines';
                break;
            case '/catalog/special/':
                urlImg = 'assets/img/catalog/special/machines';
                break;
        }
        cb(null, urlImg)
    },
    filename(req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg']

const fileFilter = (req, file, cb) => {
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = multer({
    storage,
    fileFilter,
})