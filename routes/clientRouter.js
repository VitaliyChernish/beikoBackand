const Router = require('express');
const router = new Router();
const clientData = require('../controllers/clientDataController');

router.post('/createClientData', clientData.createClientData);
router.post('/updateClientData/:id', clientData.updateClientData);
router.delete('/deleteClientData/:id',  clientData.deleteClientData);
router.get('/getAllClientData', clientData.getAllClientData)
// router.get('/:id', clientData.getOneOffers)

module.exports = router;