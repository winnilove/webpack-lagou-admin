var express = require('express');
var router = express.Router();

const consumerController = require('../constrollers/consumer')
// const oAuthMiddleWare = require('../middlewares/oAuth')

/* GET users listing. */
router.post('/register', consumerController.register)
// router.get('/issignin', oAuthMiddleWare)

module.exports = router
