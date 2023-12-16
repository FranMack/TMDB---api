const Users=require("./users.model");
const Favoritos=require("./favoritos.model")

Favoritos.belongsTo(Users,{ as: "user" })

module.exports={Users,Favoritos}