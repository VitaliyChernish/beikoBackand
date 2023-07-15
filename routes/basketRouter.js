const Router = require('express');
const router = new Router();
const basketController = require('../controllers/typeOfSkilInfoController');

router.post('/registration', basketController.create);
router.post('/login',);
router.get('/auth', (req, res) => {
    res.json({ message: 'All worging well!' })
})

module.exports = router;