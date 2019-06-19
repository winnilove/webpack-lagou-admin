const db = require('../utils/db')

class UserModel{
    // userModel = null//可写可不写
   constructor(){
    this.userModel=db.model('users',{//创建一个users表
        username:String,
        password:String
    })
   }

   insert(data){
       let users =new this.userModel(data)
       return users.save()//save()是mongo的方法，存入数据库返回结果是一个promise
    }
    select(data) {
        return this.userModel.findOne({username: data.username})
    }

}
module.exports = new UserModel()