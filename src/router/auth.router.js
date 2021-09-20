const Router = require("koa-router")
const {BASE_URL}=require('../constants/public')
const authRouter=new Router({prefix:`${BASE_URL}`})

const {
    login,
    success
}=require('../controller/auth.controller')

const {verifyLogin,verifyAuth} = require('../middleware/auth.midderware')

authRouter.post('/login',verifyLogin ,login)
authRouter.get('/login/test', verifyAuth, success);

module.exports=authRouter