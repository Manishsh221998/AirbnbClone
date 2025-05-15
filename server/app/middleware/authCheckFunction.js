const jwt=require("jsonwebtoken")
const StatusCode = require("../helper/httpStatusCode")
const dotenv=require('dotenv')

dotenv.config()

const AuthCheck= async (req,res,next)=>{
    try {
    const token=req.query.token||req.headers['x-access-token']||req.headers['authorization']||req.body.token;
//   console.log("Token :",token)
    if(!token){
        return res.status(400).json({
             status:false,
            message:'Token is required for authentication'
        })
    }

        const decode=jwt.verify(token,process.env.JWT_SECRET_KEY)
        // console.log("decode :",decode)
     
        req.user=decode
        // console.log("After login :",req.user)

    } catch (error) {
        return res.status(400).json({
            status:false,
            message:"invalid token"
        })
    }
    return next();
}

module.exports=AuthCheck