const Router = require('express')
const router = new Router()
const discountRouter = require('./discountRouter')
const userRouter = require('./userRouter')


router.use('/user', userRouter)
router.use('/discount', discountRouter)


module.exports = router
 