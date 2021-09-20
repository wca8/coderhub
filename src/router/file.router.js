const Router = require("koa-router");
const { BASE_URL } = require("../constants/public");
const { verifyAuth } = require("../middleware/auth.midderware");
const {avatarHandler,pictureHandler, pictureResize} =require('../middleware/file.midderware')
const filetRouter = new Router({ prefix: `${BASE_URL}/upload` });
const {
    saveAvatarInfo,
    savePictureInfo,

} =require('../controller/file.controller')

filetRouter.post('/avatar', verifyAuth,avatarHandler,saveAvatarInfo)
filetRouter.post('/picture', verifyAuth,pictureHandler, pictureResize,savePictureInfo)


module.exports=filetRouter