const express=require("express");
const morgan = require("morgan");
const app= express();
const routes=require("./routes/index.routes")
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser=require("cookie-parser")
require("dotenv").config();

const db=require("./config/db")
const {Users,Favoritos}=require("./models/index")

app.use(
  cors({
    origin: "http://localhost:5173", // URL del frontend
    credentials: true, // Habilita el envio de cookies
  })
);


app.use(morgan("tiny"));
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "15mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "15mb" }));

app.use("/api",routes)


const PORT = process.env.PORT || 5000;

//app.listen(PORT, () => console.log(`Listening on ${PORT}`))

db.sync({ force: false })
  .then(() => app.listen(PORT, () => console.log(`Listening on ${PORT}`)))
  .catch((error) => {
    console.log(error);
  });