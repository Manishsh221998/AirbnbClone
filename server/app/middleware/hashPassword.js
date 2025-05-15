const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')

const hashPassowrd=async (password)=>{
const salt=await bcrypt.genSalt(10)
const hashed=await bcrypt.hash(password,salt)
return hashed;
}
const comparePassword=async (password,hashedPassword)=>{
const isPasswordValidate=await bcrypt.compare(password,hashedPassword)
return isPasswordValidate;
}

module.exports={hashPassowrd,comparePassword}