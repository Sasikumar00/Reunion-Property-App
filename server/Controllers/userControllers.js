import Property from "../Models/propertyModel.js"
import mongoose from "mongoose"

const testHome = (req,res)=>{
    res.send({"message": "This is homepage"})
}
const getAllListings = async(req,res)=>{
    const properties = await Property.find().select("-__v").sort('-createdAt').populate('user');
    res.send({"properties": properties})
}
const getListingDetails = async(req,res)=>{
    try{
    let pid = req.params.id
    const property = await Property.findById(pid).populate('user')
    if(!property){
        return res.status(404).send({"message": "Property not found"})
    }
    res.send({'data':property})
    }
    catch(err){
        if(err.name=='CastError'){
            return res.status(400).send({"message":"Invalid property ID"})
        }
        console.log(err.message)
        res.status(500).send({"message": "Something went wrong"})
    }
}
const createListing = async(req,res)=>{
    try{
    const {name,price,location,city,availability,type,bedrooms,bathrooms,dimensions} = req.body;
    const property = await Property.create({name,price,location,city,availability,type,bedrooms,bathrooms,dimensions, user: req.user})
    if(property)
        res.send({"message": "New property listing created"})
    }
    catch(err){
        console.log(err)
        if(err.name==="ValidationError"){
            res.status(400).send({"message": err.message})
        }
    }
}
const updateListing = async(req,res)=>{
    try{
    const {id} = req.params;
    const existingProperty = await Property.findById(id);
    if(existingProperty){
        if(!(existingProperty.user.toString()===req.user._id.toString())){
            return res.status(401).send({"message": "Unauthorized"})
        }
        const data = req.body
        const updatedProperty = await Property.findByIdAndUpdate(id, data);
        if(updatedProperty){
            res.status(200).send({"message": "Property successfully updated"})
        }
    }
    }
    catch(err){
        console.log(err)
        res.status(500).send({"message": "Something went wrong"})
    }
}
const deleteListing = async(req,res)=>{
    try{
        const {id} = req.params
        const existingProperty = await Property.findById(id);
        if(!existingProperty){
            return res.status(404).send({"message": "Property not found"})
        }
        if(!(existingProperty.user.toString()===req.user._id.toString())){
            return res.status(401).send({"message": "Unauthorized"})
        }
        await Property.findByIdAndDelete(id)
        res.status(200).send({"message": "Property deleted successfully"})
    }
    catch(err){
        console.log(err)
        res.status(500).send({"message": "Something went wrong"})
    }
}
const getMyListings = async(req,res)=>{
    try{
    const properties = await Property.find({'user': req.user._id}).sort('-createdAt');
    if(properties.length >= 1){
        return res.status(200).send({"properties": properties})
    }
    else{
        return res.status(200).send({"message": "No properties found"})
    }
    }
    catch(err){
        console.log(err)
        res.status(500).send({"message": "Something went wrong"})
    }
}

const filterProperty = async(req,res)=>{
    try{
        let {city,price,availability,type} = req.body;
        price = parseInt(price)
        const properties = await Property.find({city,type,'availability':{$lte:availability},'price':{$lte:price}}).sort('-createdAt')
        if(properties.length>=1){
            res.send({"data": properties})
        }
        else{
            res.send({"message": "No property found"})
        }
    }
    catch(err){
        console.log(err)
        res.status(500).send({"message": "Somthing went wrong"})
    }
}

export default {testHome, getAllListings, createListing, updateListing, deleteListing, getMyListings, getListingDetails,filterProperty}