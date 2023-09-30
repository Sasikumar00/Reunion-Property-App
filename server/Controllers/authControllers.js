import signJWT from '../Helpers/tokenGenerator.js'
import User from '../Models/userModel.js'
import jwt from 'jsonwebtoken'

const signup = async(req,res)=>{
    try{
    const {fullname,email,phone,password,passwordConfirm} = req.body;
    if(!fullname || !email || !phone || !password || !passwordConfirm){
        return res.send({"message": "Please fill all fields"})
    }
    if(password!=passwordConfirm){
        return res.send({"message": "Passwords are not same"})
    }
    if(phone.length<10){
        return res.send({"message": "Enter a valid phone number"})
    }
    const user = await User.create({fullname,email,phone,password})
    if(user)
        res.status(201).send({"message": "User Created Successfully"})
    }
    catch(err){
        console.log(err.name)
        if(err.name==="MongoServerError" && err.code===11000){
            return res.send({"message": "Email address already registered"})
        }
        if(err.name==='ValidationError'){
            let message = err.message.replace("User validation failed: ","")
            return res.status(400).send({"message": message.split(":")[1].trim()})
        }
        res.status(500).send({"message": err})
    }
}
const login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        return res.send({"message": "Please enter all fields"})
    }
    let existingUser = await User.findOne({email}).select('+password');
    if(!existingUser || !(await existingUser.checkPassword(password,existingUser['password']))){
        return res.send({"message": "Invalid email or password"})
    }
    let token = await signJWT(existingUser['_id'])
    res.cookie('jwt',token,{
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true
    })
    res.status(200).send({"message": "Logged in successfully", "token": token})
}

const validateToken = async(req,res)=>{
    let token;
    try{
        if(req.headers.authorization){
            token=req.headers.authorization
        }
        else if(req.cookies?.jwt){
            token = req.cookies.jwt;
        }
        let decode = jwt.verify(token,process.env.JWT_SECRET)
        if(decode){
            res.status(200).send({'ok': true})
        }
    }
    catch(err){
        res.send({'ok': false})
    }
}

export default {login,signup,validateToken}