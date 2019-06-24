const positionModel = require('../models/position')

class PositionController{
    constructor(){}
    async findAll(req,res,next){
        res.set('Content-Type', 'application/json; charset=utf-8')
        let result = await positionModel.findAll()
        res.render('succ', {data: JSON.stringify(result)})
    }
    async save(req, res, next) {
        // 从对象里删除 companyLogo 属性
        delete req.body.companyLogo
        
        let result = await positionModel.save({
          ...req.body,
          companyLogo: req.filename
        })
    
        if (result) {
          res.render('succ', {
            data: JSON.stringify({
              message: '数据保存成功.'
            })
          })
        }
    }
    //修改数据的时候需要查找一条数据
    async findOne(req,res,next){
      res.set('Content-Type', 'application/json; charset=utf-8')
      let result = await positionModel.findOne(req.query.id)
      res.render('succ', {data: JSON.stringify(result)})
    }

    async delete(req,res,next){
      let result = await positionModel.delete(req.body.id)
      if (result) {
        res.render('succ', {
          data: JSON.stringify({
            message: '数据删除成功.'
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            message: '数据删除失败.'
          })
        })
      }
    }
    async update(req, res, next) {
      res.set('Content-Type', 'application/json; charset=utf-8')
      //这里的原理是：multer 在处理图片时，上传了图片req.body对象里没有companyLogo这个属性，
      //没有上传compangLogo就为 '' 
      delete req.body.companyLogo
      //修改时上传了图片就会有一个filename，upload-file中间件返回来的
      req.body = req.filename ? { ...req.body, companyLogo: req.filename } : req.body
      let result = await positionModel.update(req.body.id, req.body)
      if (result) {
        res.render('succ', {
          data: JSON.stringify({
            message: '数据修改成功.'
          })
        })
      } else {
        res.render('fail', {
          data: JSON.stringify({
            message: '数据修改失败.'
          })
        })
      }
    }
    
}

const positionController = new PositionController()

module.exports = positionController