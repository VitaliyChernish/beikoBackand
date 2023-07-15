const { Skill } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const ApiError = require('../error/ApiError');

class SkillController {
  async create(req, res, next) {
    try {
      const { header, howLongLearn, linkToProject, whyThis, type } = req.body;
      if (!req.files || !req.files.file) {
        return next(ApiError.badRequest('Відсутнє зображення'));
      }

      const image = req.files.file;
      const allowedExtensions = ['.jpg', '.png', '.gif'];
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

      const skill = await Skill.create({
        header,
        howLongLearn,
        linkToProject,
        whyThis,
        img: fileName,
        type,
      });

      res.json(skill);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  ////////////////////
  async getAll(req, res) {
    const skills = await Skill.findAll();
    return res.json(skills);
  }

  async getOne(req, res, next) {
    const { id } = req.params;
    const skill = await Skill.findOne({ where: { id } });
    if (!skill) {
      return next(ApiError.notFound('Skill not found'));
    }
    return res.json(skill);
  }
}

module.exports = new SkillController();