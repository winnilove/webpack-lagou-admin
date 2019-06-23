import consumersTpl from '../views/consumers-list.hbs'

import oAuth from '../utils/oAuth'

export const render = async (req,res,next)=>{
    let result = await oAuth()
    if(result.data.isSignin){
        if (result.data.isSignin) {
            $.ajax({
              url: '/api/consumers',
              headers: {
                'X-Access-Token': localStorage.getItem('token')
              },
              success(result) {
                res.render(consumersTpl({
                  data: result.data,
                  hasResult: result.data.length > 0
                }))
              }
            })
            // bindConsumersEvent(res)
          } else {
            res.go('/')
          }
    }

}