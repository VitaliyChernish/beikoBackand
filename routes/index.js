const Router = require('express');
const router = new Router();

const userRouter = require('./userRouter');
const basketRouter = require('./basketRouter');
const skillRouter = require('./skillRouter');
const offersRouter = require('./offersRouter')
const clientsRoutes = require('./clientRouter')
const slider1Routes = require('./sliderImages1Router')

router.use('/user', userRouter)
router.use('/basket', basketRouter)
router.use('/skill', skillRouter)
router.use('/offers', offersRouter)
router.use('/clients', clientsRoutes)
router.use('/slider1', slider1Routes)

module.exports = router;