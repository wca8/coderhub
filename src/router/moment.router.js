const { verify } = require('jsonwebtoken');
const Router = require('koa-router');
const {BASE_URL}=require('../constants/public')
const momentRouter = new Router({prefix: `${BASE_URL}/moment`});
const {verifyLabelExists} =require('../middleware/label.midderware')
const {
    create,
    detail,
    list,
    update,
    remove,
    addLabels,
    fileInfo
} =require('../controller/moment.controller')
const {
    verifyAuth,
    verifyPermission

} = require('../middleware/auth.midderware')

momentRouter.post('/',verifyAuth,create)
momentRouter.get('/single/:momentId', detail);
momentRouter.get('/list', list)
momentRouter.patch('/update/:momentId',verifyAuth, verifyPermission('moment'), update)
momentRouter.delete('/remove/:momentId',verifyAuth, verifyPermission('moment'), remove)
momentRouter.post('/addlabel/:momentId',verifyAuth, verifyPermission('moment'),verifyLabelExists,addLabels)

// 动态配图
momentRouter.get('/images/:filename',fileInfo)
module.exports=momentRouter