import mongoose from "mongoose";

const propertySchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, "Property name is required"]
    },
    price: {
        type: Number,
        required: [true, "Property price is required"]
    },
    location:{
        type: String,
        required: [true, "Property location is required"]
    },
    city:{
        type: String,
        required: [true, "Property city is required"]
    },
    availability: {
        type: Date,
        required: [true, "Property availability date is required"]
    },
    type: {
        type: String,
        required: [true, "Property type is required"]
    },
    bedrooms:{
        type: Number,
        required: [true, "Number of bedrooms is required"]
    },
    bathrooms: {
        type: Number,
        required: [true, 'Number of bathrooms is required']
    },
    dimensions: {
        type: String,
        required: [true, 'Property dimensions are required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

propertySchema.pre('findOneAndUpdate',function(next){
    const property = this;
    property._update['createdAt']=new Date();
    next();
})

const propertyModel = mongoose.model('Property', propertySchema)

export default propertyModel