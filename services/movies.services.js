const axios = require("axios");
require("dotenv").config();

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

class MoviesServices {
  static async getPopularMovies(movieOrTv) {
    try {
      const response = await axios.get(`${API_URL}/discover/${movieOrTv}`, {
        params: {
          api_key: API_KEY,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getMovies(list, type) {
    try {
      const response = await axios.get(`${API_URL}/${type}/${list}`, {
        params: {
          api_key: API_KEY,
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getInfoMovie(id, type) {
    try {
      const response = await axios.get(`${API_URL}/${type}/${id}`, {
        params: {
          api_key: API_KEY,
          append_to_response: "videos",
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async getFavoriesMoviesInfo(moviesId) {
    try {
      const promesas = moviesId.map((id) => {
        return axios.get(`${API_URL}/movie/${id}`, {
          params: {
            api_key: API_KEY,
          },
        });
      });

      const resultado = await Promise.all(promesas);
      const moviesInfo = resultado.map((movie) => {
        return movie.data;
      });

      return moviesInfo;
    } catch (error) {
      console.log(error);
    }
  }

  static async getInfoMovieTrailer(id) {
    try {
      const response = await axios.get(`${API_URL}/movie/${id}/videos`, {
        params: {
          api_key: API_KEY,
          append_to_response: "videos",
        },
      });

      return response;
    } catch (error) {
      console.log(error);
    }
  }

  static async searchMovies(searchKey) {
    try {
      const movies = await axios.get(
        `${API_URL}/search/movie?query=${searchKey}`,
        {
          params: {
            api_key: API_KEY,
          },
        }
      );

      return movies.data.results;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = MoviesServices;
