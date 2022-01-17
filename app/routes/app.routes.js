const router = require("express").Router()
const User = require("../controller/app.controller")
router.get("/", User.showAll)

router.get("/add", User.addUser)

router.get("/addPost", User.addUserPost)
router.post("/addPost", User.addUserLogic)
 
router.get("/single/:id",User.singleUser)

router.get("/edit/:id", User.editUser)
router.post("/edit/:id",User.editUserPost)

router.get("/delete/:id", User.deleteUser)

router.get("/addtt/:id",User.addmoney)

router.get("/withdraw/:id",User.withdraw)
router.post("/withdraw/:id",User.withdrawLogic)
// router.get("/transaction/:id",User.transactionUser)


module.exports=router 