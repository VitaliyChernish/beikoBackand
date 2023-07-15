const Router = require('express');
const router = new Router();
const typeOfSkilInfoController = require('../controllers/typeOfSkilInfoController');

router.post('/', typeOfSkilInfoController.create);
router.get('/', typeOfSkilInfoController.getAll);
router.get('/', typeOfSkilInfoController.getOne)

module.exports = router;