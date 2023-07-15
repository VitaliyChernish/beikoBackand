const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('user', {
    nickName: { type: DataTypes.STRING, unique: true },
    company: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING },
    instagramm: { type: DataTypes.STRING },
    telegramm: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    phone: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING, defaultValue: "HR" },
    token: { type: DataTypes.STRING, allowNull: false },
    avatar: {type: DataTypes.STRING},
});

const Basket = sequelize.define('basket', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
});

const Skill = sequelize.define('skill', {
    header: { type: DataTypes.STRING, unique: true, allowNull: false },
    howLongLearn: { type: DataTypes.STRING, defaultValue: 0 },
    linkToProject: { type: DataTypes.STRING },
    whyThis: { type: DataTypes.STRING },
    img: { type: DataTypes.STRING },
    type: { type: DataTypes.STRING },
});

const Offers = sequelize.define('offers', {
    name: {type: DataTypes.STRING},
    img: {type: DataTypes.STRING},
    shortDescription: {type: DataTypes.TEXT},
    fullDescription: {type: DataTypes.TEXT},
    price: {type: DataTypes.INTEGER}
});

const Articles = sequelize.define('articles', {
    name: { type: DataTypes.STRING, unique: true },
    text: { type: DataTypes.TEXT },
    description: { type: DataTypes.STRING },
});

User.hasOne(Basket);
Basket.belongsTo(User);

module.exports = {
    User,
    Basket,
    Offers,
    Articles,
    Skill,
};