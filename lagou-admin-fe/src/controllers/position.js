// import positionTpl from '../views/position.hbs'

// export const render = (req,res,next)=>{
//     res.render(positionTpl({}))
// }

//router.route('/position', positionController.render)
//向/position这个url发送请求时，就渲染positon
//原写法是：
// router.route('/user/:id', (req, res, next) => {
//     const { params, query, body , url, route } = req
//   })

import positionTpl from '../views/position-list.hbs'
import positionAddTpl from '../views/position-add.hbs'
import positionUpdateTpl from '../views/position-update.hbs'

import oAuth from '../utils/oAuth'

export const render = async (req, res, next) => {
  let result = await oAuth()
  if (result.data.isSignin) {
    $.ajax({
      url: '/api/position',
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        res.render(positionTpl({
          data: result.data,
          hasResult: result.data.length > 0
        }))
      }
    })
    bindPositionListEvent(res)
  } else {
    res.go('/')
  }
}

export const add = (req, res, next) => {
  res.render(positionAddTpl({}))
  bindPositionAddEvent(res)
}

function bindPositionListEvent(res) {
  $('#router-view').on('click', '#addbtn', (e) => {
    res.go('/position_add')
  })
}

function bindPositionAddEvent(res) {
  $('#posback').on('click', (e) => {
    res.back()
  })
  $('#possubmit').on('click', (e) => {
    $('#possave').ajaxSubmit({
      resetForm: true,
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        res.back()
      }
    })
  })
}