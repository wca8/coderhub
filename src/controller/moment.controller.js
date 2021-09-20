const fs = require("fs");
const momentservice = require("../service/momment.service");
const fileService = require("../service/file.service");
const { PICTURE_PATH } = require("../constants/public");
class MommentController {
  async create(ctx, next) {
    // 获取用户传过来的数据
    const userId = ctx.user.id;
    const { content, title } = ctx.request.body;

    // 将数据插入到数据库中
    const result = await momentservice.create(userId, content, title);
    ctx.body = result;
  }

  async detail(ctx, next) {
    // 1.获取数据(momentId)
    const momentId = ctx.params.momentId;
    console.log(momentId);
    // 2.根据id去查询这条数据
    try {
      const result = await momentservice.getMomentById(momentId);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }

  async list(ctx, next) {
    const { offset, size } = ctx.query;
    console.log(offset, size);
    try {
      const result = await momentservice.getMomentList(offset, size);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }

  async update(ctx, next) {
    // 获取参数
    const { momentId } = ctx.params;
    const { content } = ctx.request.body;
    const { id } = ctx.user;

    // 修改内容
    const result = await momentservice.update(content, momentId);
    ctx.body = result;
  }

  async remove(ctx, next) {
    try {
      // 获取momentId
      const { momentId } = ctx.params;

      //  删除内容
      const result = await momentservice.remove(momentId);
      ctx.body = result;
    } catch (error) {
      console.log(error);
    }
  }

  async addLabels(ctx, next) {
    const { labels } = ctx;
    const { momentId } = ctx.params;

    for (let label of labels) {
      const isExist = await momentservice.hasLabel(momentId, label.id);
      if (!isExist) {
        momentservice.addLabel(momentId, label.id);
      }
    }
    ctx.body = "给动态添加标签成功";
  }

  async fileInfo(ctx, next) {
    let { filename } = ctx.params;
    const fileInfo = await fileService.getFileByFilename(filename);
    const { type } = ctx.query;
    console.log(type);
    const types = ["small", "middle", "large"];
    if (types.some(item => item === type)) {
      console.log('sd');
      filename = filename + '-' + type;
    }

    ctx.response.set("content-type", fileInfo.minetype);
    ctx.body = fs.createReadStream(`${PICTURE_PATH}/${filename}`);
  }
}

module.exports = new MommentController();
