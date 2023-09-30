import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

const authenticateUser = async(req,res,next)=>{
    try{
        let token;
        // console.log(req.headers.authorization)
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(" ")[1]
        }
        else if(req.cookies?.jwt){
            token = req.cookies.jwt;
        }
        if(!token){
            return res.status(404).send({"message": "You are not logged in"})
        }
        let decode = jwt.verify(token,process.env.JWT_SECRET)
        if(decode){
            let user = await User.findById(decode.id)
            if(!user){
                return res.send({"message": "User not found"})
            }
            req.user = user;
        }
        next();
    }
    catch(err){
        console.log(err)
        return res.status(500).send({"message": "Something went wrong"})
    }
}

export default authenticateUser