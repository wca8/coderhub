const jwt = require("jsonwebtoken");
const errorTypes = require("../constants/error-types");
const service = require("../service/user.service");
const md5password = require("../utils/password-handle");
const { PUBLIC_KEY } = require("../app/config");
const authService = require("../service/auth.service");
const verifyLogin = async (ctx, next) => {
  //1 获取用户名 密码
  const { name, password } = ctx.request.body;

  // 2.判断用户名或者密码不能空
  if (!name || !password) {
    const error = new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED);
    return ctx.app.emit("error", error, ctx);
  }

  // 3判断用户是否存在 用户不存在 报错
  const result = await service.getUserByName(name);
  const user = result[0];
  if (!user) {
    const error = new Error(errorTypes.USER_DOES_NOT_EXISTS);
    return ctx.app.emit("error", error, ctx);
  }

  // 4.判断密码是否和数据库中的密码是一致(加密)
  if (md5password(password) !== user.password) {
    const error = new Error(errorTypes.PASSWORD_IS_INCORRENT);
    return ctx.app.emit("error", error, ctx);
  }

  ctx.user = user;
  await next();
};

const verifyAuth = async (ctx, next) => {
  // console.log(PUBLIC_KEY);
  console.log("验证授权的middleware~");
  // 1.获取token
  const authorization = ctx.headers.authorization;
  // console.log(authorization);
  if (!authorization) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    return ctx.app.emit("error", error, ctx);
  }
  const token = authorization.replace("Bearer ", "");

  // 2.验证token(id/name/iat/exp)

  try {
    const result = jwt.verify(token, PUBLIC_KEY, {
      algorithms: ["RS256"],
    });
    ctx.user = result;
    await next();
  } catch (err) {
    const error = new Error(errorTypes.UNAUTHORIZATION);
    ctx.app.emit("error", error, ctx);
  }
};

const verifyPermission = (tableName)=>{
  return async (ctx, next) => {
    const typeID = ctx.params[tableName+'Id']
    const {id}=ctx.user
    
    try {
      const isPermission = await authService.checkResource(tableName,typeID, id);
      if(!isPermission ) throw new Error()
      await next();
    } catch (err) {
      const error = new Error(errorTypes.UNPERMISSION);
      return ctx.app.emit('error', error, ctx);  
    } 
  }
}
module.exports = {
  verifyLogin,
  verifyAuth,
  verifyPermission,
};
