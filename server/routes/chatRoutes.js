import express from 'express'
import { protect } from '../middlewares/authMiddeware.js'
import accessChat from '../Controllers/chatController.js'
const router=express.Router()

router.route('/').post(protect,accessChat)
// router.route('/').get(protect,fetchChat)
// router.route('/group').post(protect,createGroupChat)
// router.route('/renmae').put(protect,renameGroup)
// router.route('/renmae').put(protect,removeFromGroup)
// router.route('/renmae').put(protect,addToGroup)


export default router
 