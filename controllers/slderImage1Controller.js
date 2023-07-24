const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const uuid = require('uuid');
const path = require('path');
const multer = require('multer');
const { SliderImage1 } = require('../models/models')

class SliderImageController {

    async uploadImages(req, res, next) {
        try {
            if (!req.files || !req.files.file) {
                return next(ApiError.forbidden('Відсутнє зображення'));
            }
            const sliderImageName = req.files.file;
            const allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
            const fileExtension = path.extname(sliderImageName.name);

            if (!allowedExtensions.includes(fileExtension)) {
                return next(ApiError.badRequest('Неприпустимий тип файлу'));
            }

            const fileName = uuid.v4() + fileExtension;
            const uploadPath = path.resolve(__dirname, '..', 'static', fileName);

            await sliderImageName.mv(uploadPath); // Видаліть колбек, оскільки mv є асинхронним

            const sliderImage = await SliderImage1.create({
                sliderImageName: fileName, // Збережіть лише ім'я файлу, а не об'єкт req.files.file
            });
            await sliderImage.save();

            return res.json('Реєстрація успішна');
        } catch (error) {
            return next(error);
        }
    }

    async getAllImages(req, res) {
        const offers = await SliderImage1.findAll();
        return res.json(offers);
    }

    async updateImage(req, res, next) {
        try {
            const { id } = req.params;
            const image = await SliderImage1.findOne({ where: { id } });

            if (!image) {
                return next(ApiError.notFound('Image not found'));
            }
            if (req.files) {
                const { file } = req.files;
                // Обробка завантаженого зображення, якщо воно є
                const allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
                const fileExtension = path.extname(file.name);

                if (!allowedExtensions.includes(fileExtension)) {
                    return next(ApiError.badRequest('Неприпустимий тип файлу'));
                }

                const fileName = uuid.v4() + fileExtension;
                const uploadPath = path.resolve(__dirname, '..', 'static', fileName);

                await file.mv(uploadPath, (err) => {
                    if (err) {
                        return next(ApiError.internalServerError('Помилка при завантаженні зображення'));
                    }
                });

                image.img = fileName;
            }

            await image.save();

            res.json(image);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }


    async deleteImage(req, res, next) {
        try {
            const { id } = req.params;

            const image = await SliderImage1.findOne({ where: { id } });
            if (!image) {
                return next(ApiError.notFound('Offer not found'));
            }

            await image.destroy();

            res.json({ message: 'Image deleted successfully' });
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
}

module.exports = new SliderImageController()