const Users = require("../models/users.model");
const UserServices = require("../services/user.services");
const { body, validationResult } = require("express-validator");
const { generateToken } = require("../config/token");

class UserControllers {
  static async register(req, res) {
    const data = req.body;
    const { name, lastname, email, username, password } = data;

    try {
      await body("name")
        .notEmpty()
        .withMessage("firstname is required")
        .isLength({ min: 1 })
        .withMessage("firstname minimum 1 character")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("firstname can only contain letters and spaces")
        .run(req);

      await body("lastname")
        .notEmpty()
        .withMessage("firstname is required")
        .isLength({ min: 1 })
        .withMessage("lastname minimum 1 character")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("lastname can only contain letters and spaces")
        .run(req);

      await body("username")
        .notEmpty()
        .withMessage("username is required")
        .isLength({ min: 1 })
        .withMessage("username minimum 1 character")
        .run(req);

      await body("email")
        .notEmpty()
        .withMessage("email is required")
        .isEmail()
        .withMessage("invalid email")
        .run(req);

        if(req.body.password)

      {await body("password")
        .notEmpty()
        .withMessage("password is required")
        .isLength({ min: 8 })
        .withMessage("password minimum 8 character")
        .matches(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
        .withMessage("password must contain at least one special character")
        .matches(/\d/)
        .withMessage("password must contain at least one number")
        .matches(/[a-z]/)
        .withMessage("password must contain at least one lowercase letter")
        .matches(/[A-Z]/)
        .withMessage("password must contain at least one capital letter")
        .run(req);
}
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        console.log("errores", errors);
        return res.status(400).json({ errors: errors.array() });
      }

      const existinUser = await Users.findOne({ where: { email: email } });

      if (existinUser) {
        return res.status(400).json({ errors: "User allredy exist" });
      }

      const newUser = await UserServices.register(data);
      res.status(200).json(newUser);
    } catch (error) {
      console.log(error);
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;

    try {
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        return res.status(400).json({ errors: "Wrong credentials" });
      }

      const validated = await user.validatePassword(password);

      if (!validated) {
        return res.status(400).json({ errors: "Wrong credentials" });
      }

      const payload = {
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        id: user.id,
      };

      //falta el token etc
      const token = generateToken(payload);
      console.log("token", token);

      res.cookie("token", token);
      res.status(200).json({ payload });
    } catch (error) {
      console.log(error);
    }
  }

  static async getInfo(req, res) {
    const email = req.params.email;
    try {
      const user = await UserServices.getInfo(email);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  }

  static async logout(req, res) {
    try {
      const { token } = req.body;
      res.clearCookie(token);
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
    }
  }

  static async addToFavorites(req, res) {
    const { movieId, userId } = req.body;

    try {
      const newFavorite = await UserServices.addToFavorites(movieId, userId);
      res.status(200).json(newFavorite);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }

  static async getFavorites(req, res) {
    const { userId } = req.query;

    try {
      const favorites = await UserServices.getFavorites(userId);
      res.status(200).json(favorites);
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteFavorite(req, res) {
    const { movieId, userId } = req.query;
    try {
      const deletedFavorite = await UserServices.deleteFavorite(
        movieId,
        userId
      );

      res.status(200).json({deleted:deletedFavorite});
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  }

  static async editProfile(req,res){
    const data=req.body
    try{

      await body("name")
      .notEmpty()
      .withMessage("firstname is required")
      .isLength({ min: 1 })
      .withMessage("firstname minimum 1 character")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("firstname can only contain letters and spaces")
      .run(req);

    await body("lastname")
      .notEmpty()
      .withMessage("firstname is required")
      .isLength({ min: 1 })
      .withMessage("lastname minimum 1 character")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("lastname can only contain letters and spaces")
      .run(req);

    await body("username")
      .notEmpty()
      .withMessage("username is required")
      .isLength({ min: 1 })
      .withMessage("username minimum 1 character")
      .run(req);

    await body("email")
      .notEmpty()
      .withMessage("email is required")
      .isEmail()
      .withMessage("invalid email")
      .run(req);

    if(req.body.password){await body("password")
      .notEmpty()
      .withMessage("password is required")
      .isLength({ min: 8 })
      .withMessage("password minimum 8 character")
      .matches(/^(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .withMessage("password must contain at least one special character")
      .matches(/\d/)
      .withMessage("password must contain at least one number")
      .matches(/[a-z]/)
      .withMessage("password must contain at least one lowercase letter")
      .matches(/[A-Z]/)
      .withMessage("password must contain at least one capital letter")
      .run(req);}

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log("errores", errors);
      return res.status(400).json({ errors: errors.array() });
    }


      const userModified= await UserServices.editProfile(data)
      res.status(200).json({userModified})

    }

    catch(error){console.log(error)

    }
  }
}

module.exports = UserControllers;
