import mongoose from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: [true, "Fullname is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email address already registered"],
        lowercase: true
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        minlength: 10
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: 8,
        select: false
    }
})

//Middleware to encode password everytime it's changed
userSchema.pre('save', async function(next){
    if(!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 12);
    next();
});

//Custom user schema method to compare passwords
userSchema.methods.checkPassword = async(currPassword,userPassword)=>{
    return await bcrypt.compare(currPassword,userPassword)
}

const User = mongoose.model('User', userSchema)

export default User