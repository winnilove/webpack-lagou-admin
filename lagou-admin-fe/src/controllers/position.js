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
import randomstring from 'randomstring'


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

//修改完成后提交的操作，点击编辑，跳出表单修改页面，点击确定，地址栏发生变化，从而执行这个update
export const update = (req,res,next)=>{
  $.ajax({
    url:'/api/position/one',
    data: {
      id: req.params.id
    },
    headers: {
      'X-Access-Token': localStorage.getItem('token')
    },
    success(result) {
      if (result.ret) {
        res.render(positionUpdateTpl({
          ...result.data
        }))
      } else {
        alert(result.data)
      }
    }
  })
  bindPositionUpdateEvent(req, res)
}

//修改，删除，返回
function bindPositionListEvent(res) {
  $('#router-view').on('click', '#addbtn', (e) => {
    res.go('/position_add')
  })
  //删除
  $('#router-view').off('click', '.btn-delete').on('click', '.btn-delete', function(e) {
    $.ajax({
      url: '/api/position',
      type: 'DELETE',
      data: {
        id: $(this).closest('tr').attr('data-id')
      },
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        if (result.ret) {
          res.go('/position/' + randomstring.generate(7))
        } else {
          alert(result.data)
        }
      }
    })
  })
  $('#router-view').off('click', '.btn-update').on('click', '.btn-update', function(e) {
    res.go('/position_update/' + $(this).closest('tr').attr('data-id'))
  })
}

function bindPositionAddEvent(res) {
  $('#posback').on('click', (e) => {
    res.back()
  })
  //表单提交
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

//修改表单时监听事件
function bindPositionUpdateEvent(req, res) {
  $('#router-view').off('click', '#posback').on('click', '#posback', (e) => {
    res.back()
  })

  $('#router-view').off('click', '#possubmit').on('click', '#possubmit', (e) => {
    $('#posupdate').ajaxSubmit({
      resetForm: true,
      headers: {
        'X-Access-Token': localStorage.getItem('token')
      },
      success(result) {
        if (result.ret) {
          res.back()
        } else {
          alert(result.data)
        }
      }
    })
    // $.ajax({
    //   // resetForm: true,
    //   type: 'PATCH',
    //   data: $('#posupdate').serialize(),
    //   headers: {
    //     'X-Access-Token': localStorage.getItem('token')
    //   },
    //   success(result) {
    //     if (result.ret) {
    //       res.back()
    //     } else {
    //       alert(result.data)
    //     }
    //   }
    // })
  })
}