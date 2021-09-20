const Koa = require("koa");
const app = new Koa();
const userRouter=require('../router/user.router')
const authRouter=require('../router/auth.router')
const bodyParser = require('koa-bodyparser');
const errorHandle=require('./error-handle')
const useRoutes=require('../router')

app.useRoutes=useRoutes

// 解析json数据
app.use(bodyParser())
// 将路由挂载到app上

app.useRoutes()
app.on('error',errorHandle)
module.exports = app;
