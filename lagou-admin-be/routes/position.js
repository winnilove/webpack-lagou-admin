var express = require('express')
var router = express.Router()

const positionController = require('../constrollers/position')
const oAuthBase = require('../middlewares/oAuth-base')
const fileUpload = require('../middlewares/upload-file')

router.route('/')
    .all(oAuthBase)
    .get(positionController.findAll)//获取所用的数据
    .post(fileUpload.uploadFile, positionController.save)//上传表单数据
    .delete(positionController.delete)
router.get('/one', positionController.findOne)
router.post('/update', fileUpload.uploadFile, positionController.update)

module.exports = router