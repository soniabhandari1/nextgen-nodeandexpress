const express=require('express')
const router=express.Router()
const {register,login}=require('../controllers/Users')
router.route('/register').post(register)
router.route('/login').post(login)//new route

module.exports=router