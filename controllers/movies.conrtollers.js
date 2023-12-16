const { json } = require("body-parser");
const MoviesServices = require("../services/movies.services");

class MoviesControllers {
  static async getPopularMovies(req, res) {
    const movieOrTv = req.params.movieOrTv;

    try {
      const response = await MoviesServices.getPopularMovies(movieOrTv);
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getMovies(req, res) {
    const { list, type } = req.params;

    try {
      const response = await MoviesServices.getMovies(list, type);
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getInfoMovie(req, res) {
    const { id,type } = req.params;

    console.log("xxxxxxxxxx",id)
    console.log("xxxxxxxxxx",type)

    try {
      const response = await MoviesServices.getInfoMovie(id,type);
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  static async getFavoriesMoviesInfo(req, res) {
    const { moviesId } = req.body;
    console.log("moviesID CONTROLLER", moviesId);

    try {
      const moviesInfo = await MoviesServices.getFavoriesMoviesInfo(moviesId);

      res.status(200).json(moviesInfo);
    } catch (error) {
      console.log(error);
    }
  }

  static async getInfoMovieTrailer(req, res) {
    const { id } = req.params;

    try {
      const response = await MoviesServices.getInfoMovieTrailer(id);
      res.status(200).json(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  static async searchMovies(req, res) {
    const { query } = req.query;

    console.log("query==========>", query);

    try {
      const movies = await MoviesServices.searchMovies(query);
      console.log("controllers==========>", movies);

      res.status(200).json(movies);
    } catch (error) {
      console.log(error);
    }
  }
}
module.exports = MoviesControllers;
