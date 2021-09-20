const fs = require("fs");
const fileService = require("../service/file.service");
const { APP_HOST, APP_PORT } = require("../app/config");
const { BASE_URL } = require("../constants/public");
const userService = require("../service/user.service");
const { log } = require("console");
class FileController {
  async saveAvatarInfo(ctx, next) {
    console.log(ctx.req.file);
    const { filename, mimetype, size } = ctx.req.file;
    const { id } = ctx.user;

    const result = await fileService.createAvatar(filename, mimetype, size, id);
    // 将图像保存在url地址中
    const avatarUrl = `${APP_HOST}:${APP_PORT}${BASE_URL}/users/avatar/${id}`;
    await userService.updateAvatarUrlById(avatarUrl, id);

    ctx.body = "上传头像成功";
  }

  async savePictureInfo(ctx, next) {
    try {
      const files = ctx.req.files;
      const { momentId } = ctx.query;
      const { id } = ctx.user;
      for (let file of files) {
        console.log(file);
        let { filename, mimetype, size } = file;
        await fileService.createFile(filename, mimetype, size, id, momentId);
      }

      ctx.body = "动态配图上传完成";
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new FileController();
