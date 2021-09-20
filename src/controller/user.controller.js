const service = require("../service/user.service");
const fs=require('fs')
const { AVATAR_PATH } = require("../constants/public");

class UserController {
  async create(ctx, next) {
    // 获取用户请求来的参数
    const user = ctx.request.body;

    // 查询数据
    const result = await service.create(user);

    // 返回数据
    // ctx.body=result
    ctx.body = result;
  }

  async avatarInfo(ctx, next) {
    const { userId } = ctx.params;
    const result = await service.getAvatarByUserId(userId);
    
    ctx.response.set("content-type", result.mimetype);
    ctx.body = fs.createReadStream(`${AVATAR_PATH}/${result.filename}`);
    
  }
}

module.exports = new UserController();
