const {Users,Favoritos}=require("../models/index")

class UserServices {
  static async register(data) {
    try {
      const newUser = await Users.create(data);
      return newUser;
    } catch (error) {
      console.log(error);
    }
  }

  static async login(data){
    const{email,password}=data
    try{
        const user=await Users.findOne({where:{email:email}})

        return user;

    }

    catch(error){
        console.log(error)

    }
  }

  static async getInfo(email){

    try{
      const user=await Users.findOne({where:{email:email}})
      if(!user){
        throw new Error("User not found")
      }
      else return user;

    }

    catch(error){

      console.log(error)

    }
  }

  static async addToFavorites(movieId,userId){

    try{
      const user=await Users.findByPk(userId)
      if(!user){
        throw new Error("El usuario no existe")
      }
      const favorite=await Favoritos.findOne({where:{movieId,userId}})
      console.log("favoriteeee",favorite)
      if(favorite){
        throw new Error("La pelicula ya se encuentra agregada en favoritos")
      }
      const newFavorite= await Favoritos.create({movieId})
      return newFavorite.setUser(userId)
    }

    catch (error) {
      // Verifica si el error proviene de una respuesta del servidor
      if (error.response && error.response.data) {
        throw new Error(error.response.data);
      } else {
        // Si es otro tipo de error, lanza el error original
        throw error;
      }
    }

  }

  static async getFavorites(userId){
    try{

      const favorites= await Favoritos.findAll({where:{userId:userId}})
      const moviesId=favorites.map((movie)=>{return movie.movieId})
      return moviesId

    }

    catch(error){
      console.log(error)
      
    }
  }

}

module.exports = UserServices;
