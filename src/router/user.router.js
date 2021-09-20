const Router = require("koa-router");
const {BASE_URL}=require('../constants/public')
const { create,avatarInfo } = require("../controller/user.controller");

const userRouter = new Router({ prefix:`${BASE_URL}/users` });

const { verifyUser,handlePassword} =require("../middleware/user.middleware")

userRouter.post("/",  verifyUser,handlePassword,create);
userRouter.get('/avatar/:userId', avatarInfo)
module.exports = userRouter;
