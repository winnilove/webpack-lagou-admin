const consumerModel = require('../models/consumer')
const bcrypt = require('bcrypt')
class ConsumerController {
  //密码加密
    hashPassword(pwd){
      return new Promise((resolve)=>{
        bcrypt.hash(pwd,10,(err,hash)=>{
          resolve(hash)
        })
      })
    }
    //登陆时对比密码
    comparePassword(pwd,hash){
      return new Promise((resolve)=>{
        bcrypt.compare(pwd,hash,function(err,res){
          resolve(res)
        })
      })
    }
    //登陆时给用户生成一个token
    getToken(username){
      let cert = fs.readFileSync(path.resolve(__dirname, '../keys/rsa_private_key.pem'))
      return jwt.sign({username},cert,{algorithm:'RS256'})
    }
    //获取当前日期 时间
   todayTime() {
      var date = new Date();
      var curYear = date.getFullYear();
      var curMonth = date.getMonth() + 1;
      var curDate = date.getDate();
      if(curMonth<10){
              curMonth = '0' + curMonth;
      }
      if(curDate<10){
              curDate = '0' + curDate;
      }    
      var curHours = date.getHours();
      var curMinutes = date.getMinutes();
      var curtime = curYear + ' 年 ' + curMonth + ' 月 ' + curDate +' 日' + curHours + '时 ' + curMinutes + '分 ';
      return curtime;
    }

    async register(req, res, next) {
        let consumer = await consumerModel.select(req.body)
        if (consumer) {
          res.render('succ', {
            data: JSON.stringify({
              message: '用户名已经存在。'
            })
          })
          return
        }
        res.set('Content-Type', 'application/json; charset=utf-8');
        let password = await consumerController.hashPassword(req.body.password)
        let result =await consumerModel.insert({
          ...req.body,
          password,
          regtime:consumerController.todayTime()
        })
        if(result){
           res.render('succ', {
            data: JSON.stringify({
              messages:'注册成功'
            })
          })
        }else{
          res.render('fail', {
            data: JSON.stringify({
              messages:'注册失败'
            })
        })
      }     
    }

    async findAll(req, res, next) {
      res.set('Content-Type', 'application/json; charset=utf-8')
      let result = await consumerModel.findAll()
      res.render('succ', {data: JSON.stringify(result)})
    }



} 
const consumerController = new ConsumerController()
module.exports = consumerController