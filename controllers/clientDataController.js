const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const uuid = require('uuid');
const path = require('path');
const multer = require('multer');
const { ClientBase } = require('../models/models')

class ClientController {
    async createClientData(req, res, next) {
        const {
            clientName,
            clientPhone,
            clientEmail,
            clientTelegram,
            clientOffer,
            offerConfirmation,
            offerDetails,
            date
        } = req.body;
        try {
            const clientBase = await ClientBase.create({
                clientName,
                clientPhone,
                clientEmail,
                clientTelegram,
                clientOffer,
                offerConfirmation,
                offerDetails,
                date
            });
            await clientBase.save();

            return res.json(`Дякую, найближчим часом зв'яжусь із вами`);
        } catch (error) {
            return next(error);
        }
    }

    async getAllClientData(req, res) {
        const offers = await ClientBase.findAll();
        return res.json(offers);
    }

    async updateClientData(req, res, next) {
        try {
            const { id } = req.params;
            const {
                clientName,
                clientPhone,
                clientEmail,
                clientTelegram,
                clientOffer,
                offerConfirmation,
                offerDetails,
            } = req.body;

            const client = await ClientBase.findOne({ where: { id } });

            if (!client) {
                return next(ApiError.notFound('Client not found'));
            }
            // Оновлення полів оголошення, якщо дані існують
            if (clientName) {
                client.clientName = clientName;
            }
            if (clientPhone) {
                client.clientPhone = clientPhone;
            }
            if (clientEmail) {
                client.clientEmail = clientEmail;
            }
            if (clientTelegram) {
                client.clientTelegram = clientTelegram;
            }
            if (clientOffer) {
                client.clientOffer = clientOffer;
            }
            if (offerConfirmation) {
                client.offerConfirmation = offerConfirmation;
            }
            if (offerDetails) {
                client.offerDetails = offerDetails;
            }

            await client.save();

            res.json(client);
        } catch (error) {
            next(ApiError.badRequest(error.message));
        }
    }
    async deleteClientData(req, res, next) {
        try {
          const { id } = req.params;
    
          const client = await ClientBase.findOne({ where: { id } });
          if (!client) {
            return next(ApiError.notFound('Client is not found'));
          }
    
          await client.destroy();
    
          res.json({ message: 'Client`s orde deleted successfully' });
        } catch (error) {
          next(ApiError.badRequest(error.message));
        }
      }s
    //   async getOneOffers(req, res, next) {
    //     const { id } = req.params;
    //     const offers = await Offers.findOne({ where: { id } });
    //     if (!offers) {
    //       return next(ApiError.notFound('Offers not found'));
    //     }
    //     return res.json(offers);
    //   }
    //   async deleteOffer(req, res, next) {
    //     console.log('deleteOffer working!!!')
    //     try {
    //       const { id } = req.params;

    //       const offer = await Offers.findOne({ where: { id } });
    //       if (!offer) {
    //         return next(ApiError.notFound('Offer not found'));
    //       }

    //       await offer.destroy();

    //       res.json({ message: 'Offer deleted successfully' });
    //     } catch (error) {
    //       next(ApiError.badRequest(error.message));
    //     }
    //   }
}

module.exports = new ClientController()