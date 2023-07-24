const { Offers } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class OffersController {
  ////////////////////
  async getAllOffers(req, res) {
    const offers = await Offers.findAll();
    return res.json(offers);
  }

  async getOneOffers(req, res, next) {
    const { id } = req.params;
    const offers = await Offers.findOne({ where: { id } });
    if (!offers) {
      return next(ApiError.notFound('Offers not found'));
    }
    return res.json(offers);
  }

  async createOffers(req, res, next) {
    try {
      const { name, shortDescription, fullDescription, price } = req.body;
      if (!req.files || !req.files.file) {
        return next(ApiError.badRequest('Відсутнє зображення'));
      }

      const image = req.files.file;
      const allowedExtensions = ['.jpg', '.png', '.gif', '.jpeg'];
      const fileExtension = path.extname(image.name);

      if (!allowedExtensions.includes(fileExtension)) {
        return next(ApiError.badRequest('Неприпустимий тип файлу'));
      }

      const fileName = uuid.v4() + fileExtension;
      const uploadPath = path.resolve(__dirname, '..', 'static', fileName);

      await image.mv(uploadPath, (err) => {
        if (err) {
          return next(ApiError.internalServerError('Помилка при завантаженні зображення'));
        }
      });

      const offer = await Offers.create({
        name,
        shortDescription,
        fullDescription,
        price,
        img: fileName,
      });

      res.json(offer);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
  async updateOffer(req, res, next) {
    try {
      const { id } = req.params;
      const { name, shortDescription, fullDescription, price } = req.body;

      const offer = await Offers.findOne({ where: { id } });

      if (!offer) {
        return next(ApiError.notFound('Offer not found'));
      }

      // Оновлення полів оголошення, якщо дані існують
      if (name) {
        offer.name = name;
      }
      if (shortDescription) {
        offer.shortDescription = shortDescription;
      }
      if (fullDescription) {
        offer.fullDescription = fullDescription;
      }
      if (price) {
        offer.price = price;
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

        offer.img = fileName;
      }

      await offer.save();

      res.json(offer);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }


  async deleteOffer(req, res, next) {
    console.log('deleteOffer working!!!')
    try {
      const { id } = req.params;

      const offer = await Offers.findOne({ where: { id } });
      if (!offer) {
        return next(ApiError.notFound('Offer not found'));
      }

      await offer.destroy();

      res.json({ message: 'Offer deleted successfully' });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new OffersController();