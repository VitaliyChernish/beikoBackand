const { Basket } = require('../models/models');
const ApiError = require('../error/ApiError')

class BasketController {
    async create(req, res) {
        const { name } = req.body
        const basket = await Basket.create({ name })
        return res.json(type)
    }
    async getAll(req, res) {
        const basket = await Basket.findAll()
        return res.json(types)
    }
}

module.exports = new BasketController()