import jwt from 'jsonwebtoken'

const signJwt = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE_TIME
    });
};

export default signJwt