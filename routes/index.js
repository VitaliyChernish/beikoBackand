const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const basketRouter = require('./basketRouter');
const skillRouter = require('./skillRouter');
const typeOfSkillInfoRouter = require('./typeOfSkillInfoRouter')
const offersRouter = require('./offersRouter')

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/skill', skillRouter)
router.use('/typeOfSkillInfo', typeOfSkillInfoRouter)
router.use('/offers', offersRouter)

module.exports = router;