const Router = require('express');
const router = new Router();
const skillController = require('../controllers/skillController');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/create', checkRole('ADMIN'), skillController.create);
router.get('/all', skillController.getAll)
router.get('/:id', skillController.getOne)

module.exports = router;