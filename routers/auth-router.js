const express = require("express")
const router=express.Router()

const authController = require("../controllers/auth-controller")
const {register,login} = require("../validations/auth-validation")
const authValidate = require("../middlewares/auth-validate")
const authMiddleware = require("../middlewares/auth-middleware")

router.route("/register").post(authValidate(register),authController.register)
router.route("/login").post(authValidate(login),authController.login)
router.route("/user").get(authMiddleware,authController.user)

module.exports=router