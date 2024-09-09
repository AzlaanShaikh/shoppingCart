import Product from "../models/products.model.js";
import mongoose from "mongoose";

export const getProduct = async (req,res)=>{
    try {
        const products=await Product.find({});
        res.status(200).json({success:true, data:products})
    } catch (error) {
        console.log("Error in fetching products",error.message);
        res.status(500).json({succes:false,message:"Server Error"})
        
    }
}

export const createProduct =async(req,res)=>{
    const product=req.body;

    if(!product.name || !product.price || !product.image){
        return res.status(400).json({success:false,message:"Please Provide all fields!"})
    }

    const newProduct=new Product(product)

    try{
        await newProduct.save();
        res.status(201).json({success:true, data:newProduct});
    }catch(e){
        console.log("error in create product: ", e.message);
        res.status(500).json({success:false,message:"Server Error "});
    }
}

export const updatedProduct=async (req,res)=>{
    const {id}=req.params;

    const product=req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product ID"});
    }

    try {
        const updatedProduct=await Product.findByIdAndUpdate(id,product,{new:true})
        res.status(200).json({success:true,data:updatedProduct});
    } catch (error) {
        res.status(500).json({success:false,message:"Server Error"}); 
    }
}

export const deleteProduct =  async (req,res)=>{
    const {id}= req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"Invalid Product ID"});
    }

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({success:true,message:"Product Deleted"})
    } catch (error) {
        console.log("Eror in deleting product");
        
        res.status(500).json({success:false, message:"Server Error"})
    }
}