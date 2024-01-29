const express = require("express");
const userRouter = express.Router();
const UserControllers = require("../controllers/users.controllers");
const validateAuth = require("../midlewares/auth");

userRouter.post("/register", UserControllers.register);
userRouter.post("/login", UserControllers.login);
userRouter.get("/info/:email", validateAuth, UserControllers.getInfo);
userRouter.post("/logout", validateAuth, UserControllers.logout);
userRouter.post("/addFavorite", validateAuth, UserControllers.addToFavorites);
userRouter.delete("/deleteFavorite", UserControllers.deleteFavorite);
userRouter.get("/favorites", validateAuth, UserControllers.getFavorites);
userRouter.get("/me", validateAuth, (req, res) => {
  res.send(req.user);
});

module.exports = userRouter;
