const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');

//---- users and admin
const getAllProducts = async (req,res) =>{
    const qcategory = req.query.category;
    const qnewest = req.query.new
    let products;

    if(qnewest){
        products =   await Product.find().limit(1).sort({createdAt:-1})
    }else if(qcategory){
        products = await Product.find({category:{$in:[qcategory],}})
    }else{
        products = await Product.find();   
    }
    res.status(StatusCodes.OK).json({ products, count: products.length });
}

const getSingleProduct = async (req,res) =>{ 
    const { id: productId } = req.params;
    try {
        const singleProduct = await Product.findById(productId)
        res.status(StatusCodes.OK).json({singleProduct});
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}

//----admin only actions
const createProduct = async (req,res) =>{
    try {
        req.body.createdBy = req.user.userId
        const product = await Product.create(req.body);
        res.status(StatusCodes.CREATED).json( product);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}

const updateProduct = async (req,res) =>{
    const { id: productId } = req.params;
    try {
        const updatedProduct =await Product.findByIdAndUpdate(
            productId, 
            {$set:req.body},
            {new: true,  runValidators: true}
            )
        res.status(StatusCodes.OK).json(updatedProduct);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}

const deleteProduct = async (req,res) =>{
    const { id: productId } = req.params;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
        throw new CustomError.NotFoundError(`No product with id : ${productId}`);
      }
    res.status(StatusCodes.OK).json(`Product with id: ${productId} been deleted`)
}

const uploadImage = async (req,res) =>{
    res.status(StatusCodes.OK).json("ok")
}

module.exports ={
createProduct,
getAllProducts,
getSingleProduct,
updateProduct,
deleteProduct,
uploadImage,
}