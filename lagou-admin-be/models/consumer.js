const db = require('../utils/db')

class ConsumerModel{
    // userModel = null//可写可不写
   constructor(){
    this.consumerModel=db.model('consumers',{//创建一个consumers表
        username:String,
        phoneNumber:String,
        email:String,
        password:String,
        regtime:String,
        rank:String,
        note:String
    })
   }
   insert(data){
       let consumers =new this.consumerModel(data)
       return consumers.save()//save()是mongo的方法，存入数据库返回结果是一个promise
    }
    select(data) {
        return this.consumerModel.findOne({username: data.username})
    }

    // 查询所有数据
    findAll() {
        return this.consumerModel.find({}).sort({_id: -1})
    }
}
 
module.exports = new ConsumerModel()