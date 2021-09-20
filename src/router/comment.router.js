const Router = require("koa-router");
const { BASE_URL } = require("../constants/public");
const commentRouter = new Router({ prefix: `${BASE_URL}/comment` });
const { verifyAuth, verifyPermission } = require("../middleware/auth.midderware");

const { create, reply, update ,remove,list} = require("../controller/comment.controller");

// 评论
commentRouter.post("/", verifyAuth, create);
// 回复评论
commentRouter.post("/reply/:commentId", verifyAuth, reply);
// 修改评论
commentRouter.patch("/update/:commentId", verifyAuth,verifyPermission('comment'), update);
// 删除评论
commentRouter.delete("/remove/:commentId", verifyAuth,verifyPermission('comment'), remove);
// 评论列表
commentRouter.get('/list',list)
module.exports = commentRouter;
