const Router = require('express');
const router = new Router();
const sliderImageController = require('../controllers/slderImage1Controller');
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/createSlider1', checkRole('ADMIN'), sliderImageController.uploadImages);
router.post('/updateSlider1/:id', checkRole('ADMIN'), sliderImageController.updateImage);
router.delete('/delete/:id', checkRole('ADMIN'),  sliderImageController.deleteImage);
router.get('/getAllOSlides', sliderImageController.getAllImages)

module.exports = router;