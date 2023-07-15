const { TypeOfSkilInfo } = require('../models/models');
const ApiError = require('../error/ApiError')

class TypeOfSkilInfoController {
    async create(req, res) {
        const { skillInfo, title, description } = req.body
        const skilInfo = await TypeOfSkilInfo.create({ skillInfo, title, description })
        return res.json(skilInfo)
    }
    async getAll(req, res) {
        const skilsInfo = await TypeOfSkilInfo.findAll()
        return res.json(skilsInfo)
    }

    async getOne(req, res) {
        const skilsInfo = await TypeOfSkilInfo.findOne()
        return res.json(skilsInfo)
    }
}

module.exports = new TypeOfSkilInfoController()