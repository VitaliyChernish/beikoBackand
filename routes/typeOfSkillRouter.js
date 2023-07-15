const Router = require('express');
const router = new Router();
const typeOfSkillController = require('../controllers/typeOfSkillController');

router.post('/', typeOfSkillController.create);
router.get('/', typeOfSkillController.getAll);
// router.get('/auth', (req, res) => {
//     res.json({ message: 'All worging well!' })
// })

module.exports = router;