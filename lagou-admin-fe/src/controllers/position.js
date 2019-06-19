import positionTpl from '../views/position.hbs'

export const render = (req,res,next)=>{
    res.render(positionTpl({}))
}

//router.route('/position', positionController.render)
//向/position这个url发送请求时，就渲染positon
//原写法是：
// router.route('/user/:id', (req, res, next) => {
//     const { params, query, body , url, route } = req
//   })