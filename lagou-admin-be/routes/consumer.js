var express = require('express');
var router = express.Router();

const consumerController = require('../constrollers/consumer')
// const oAuthMiddleWare = require('../middlewares/oAuth')
const oAuthBase = require('../middlewares/oAuth-base')

/* GET users listing. */
//后台的前端请求数据
router.route('/')
  .all(oAuthBase)
  .get(consumerController.findAll)
//前台app请求
router.post('/register', consumerController.register)
// router.get('/issignin', oAuthMiddleWare)

module.exports = router
