const express=require("express");
const router= express.Router();
const movieRoutes=require("./movies.routes")
const userRoutes=require("./user.routes")


router.use("/content",movieRoutes);
router.use("/user",userRoutes)


module.exports=router;