import SMERouter from 'sme-router'
import activeMiddleware from './active'
import * as indexController from '../controllers/index'
import * as positionController from '../controllers/position'
import * as consumersController from '../controllers/consumers'

const router = new SMERouter('router-view')//默认hash路由

router.route('/', indexController.render)
router.route('/position', positionController.render)
router.route('/position_add', positionController.add)
router.route('/consumers', consumersController.render)
router.route('/position_update/:id', positionController.update)
router.route('*', (req, res, next) => {
  res.redirect('/') // 实际上协助跳转到 / 路由上
})

router.use(activeMiddleware)