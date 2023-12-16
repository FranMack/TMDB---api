const express = require("express");
const movieRouter = express.Router();
const MovieControllers = require("../controllers/movies.conrtollers");

movieRouter.get("/:movieOrTv", MovieControllers.getPopularMovies);
movieRouter.get("/movie/search", MovieControllers.searchMovies);
movieRouter.get("/:type/:list", MovieControllers.getMovies);
movieRouter.get("/:type/info/:id", MovieControllers.getInfoMovie);
movieRouter.get("/movie/info/:id/videos", MovieControllers.getInfoMovieTrailer);
movieRouter.post("/favoritesInfo", MovieControllers.getFavoriesMoviesInfo);

module.exports = movieRouter;
