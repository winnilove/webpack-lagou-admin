const db = require('../utils/db')
class PositionModel{
    constructor(){
        let PositionSchema = {
            companyLogo:String,
            companyLogo: String,
            companyName: String,
            positionName: String,
            city: String,
            salary: String,
            createTime: String
        }
        this.positionModel = db.model('positions',PositionSchema)
    }
    save(data){
        let position = new this.positionModel({
            ...data,
            createTime:'2019年6月21日'
        })
        return position.save()
    }
    // 查询所有数据
    findAll() {
        return this.positionModel.find({}).sort({_id: -1})
    }
    //查询单条数据
    findOne(id){
        return this.positionModel.findById(id)
    }
    //删除数据
    delete(id){
        return this.positionModel.findByIdAndRemove(id)
    }
    // 更新数据
  update(id, update) {
    return this.positionModel.findByIdAndUpdate(id, update)
  }

}

const positionModel = new PositionModel()

module.exports = positionModel