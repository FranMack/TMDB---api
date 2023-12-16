const Sequelize = require("sequelize");
const db = require("../config/db");
const bcrypt = require("bcrypt");

class Users extends Sequelize.Model {}

Users.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastname: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { isEmail: true },
      unique: true,
    },
    url_img: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    salt: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },

  { sequelize: db, modelName: "user" }
);

Users.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync(8);
  user.salt = salt;
  return bcrypt.hash(user.password, user.salt).then((hash) => {
    user.password = hash;
  });
});

Users.prototype.validatePassword = function (password) {
  return bcrypt
    .hash(password, this.salt)
    .then((hash) => hash === this.password);
};

module.exports = Users;
