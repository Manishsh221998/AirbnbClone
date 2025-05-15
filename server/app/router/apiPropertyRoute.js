const express=require("express")
const ApiControllerProperty = require("../controller/apiControllerProperty/ApiControllerProperty")
const router=express.Router()

router.get('/property-list',ApiControllerProperty.getAllProperty)
router.get('/categorywise-list',ApiControllerProperty.getCategoryList)

module.exports=router