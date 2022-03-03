const { Router } = require("express")
const multer = require("multer");
const uploadConfig = require('./config/upload');

const TagController = require('./controllers/TagController')
const TopicController = require('./controllers/TopicController')
const MenuController = require('./controllers/MenuController')
const NewsController = require('./controllers/NewsController')

const router = Router();
const upload = multer(uploadConfig);

router.get('/tags', TagController.index)
router.get('/topics', TopicController.index)
router.get('/menus', MenuController.index)

router.post('/news', NewsController.store)

module.exports = router

