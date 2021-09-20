const Router = require("koa-router");
const {BASE_URL}=require('../constants/public')
const { 
    create,
    list

} = require("../controller/label.controller");
const { verifyAuth } = require("../middleware/auth.midderware");
const labelRouter = new Router({prefix: `${BASE_URL}/label`});

labelRouter.post('/',verifyAuth,create)
labelRouter.get('/',list)
module.exports=labelRouter