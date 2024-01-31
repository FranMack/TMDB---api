const { Users, Favoritos } = require("../models/index");

class UserServices {
  static async register(data) {
    try {
      const newUser = await Users.create(data);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  static async login(data) {
    const { email, password } = data;
    try {
      const user = await Users.findOne({ where: { email: email } });

      return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async getInfo(email) {
    try {
      const user = await Users.findOne({ where: { email: email } });
      if (!user) {
        throw new Error("User not found");
      } else return user;
    } catch (error) {
      console.log(error);
    }
  }

  static async addToFavorites(movieId, userId) {
    try {
      const user = await Users.findByPk(userId);
      if (!user) {
        throw new Error("El usuario no existe");
      }
      const favorite = await Favoritos.findOne({ where: { movieId, userId } });
      console.log("favoriteeee", favorite);
      if (favorite) {
        throw new Error("La pelicula ya se encuentra agregada en favoritos");
      }
      const newFavorite = await Favoritos.create({ movieId });
      return newFavorite.setUser(userId);
    } catch (error) {
      // Verifica si el error proviene de una respuesta del servidor
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        // Si es otro tipo de error, lanza el error original
        throw error;
      }
    }
  }

  static async getFavorites(userId) {
    try {
      const favorites = await Favoritos.findAll({ where: { userId: userId } });
      const moviesId = favorites.map((movie) => {
        return movie.movieId;
      });
      return moviesId;
    } catch (error) {
      console.log(error);
    }
  }

  static async deleteFavorite(movieId, userId) {
    try {
      const deletedFavorite = await Favoritos.findOne({
        where: { movieId: movieId, userId: userId },
      });
      if (!deletedFavorite) {
        throw new Error("Pelicula no encontrada en favoritos");
      }

      Favoritos.destroy({ where: { movieId: movieId } });

      return;
    } catch (error) {
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        throw error;
      }
    }
  }

  static async editProfile(data) {
    try {
      const user = await Users.findOne({ where: { email: data.email } });

      user.name = data.name;
      user.lastname = data.lastname;
      user.username = data.username;
      user.url_img = data.url_img;

      if (data.password) {await user.actualizar(data.password)}

      

      const userModified = await user.save();

      return userModified;
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UserServices;
