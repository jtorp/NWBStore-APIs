const Cart = require('../models/Cart');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');



const createCart = async (req, res) => {
    const cart = new Cart(req.body)
    try {
        const newCart = await cart.save();
        res.status(StatusCodes.CREATED).json(newCart);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}


const updateCart = async (req, res) => {
    try {
        const updatedCart = await Cart.findByIdAndUpdate(req.params.id, {
            $set: req.body,
        }, {
            new: true,
        })
        res.status(StatusCodes.CREATED).json(updatedCart);

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}

const deleteCart = async (req, res) => {
    const { userId } = req.params.id
    console.log(userId)
    const cart = await Cart.findByIdAndDelete(userId)
    if (!cart) {
        throw new NotFoundError(`No cart found for user ${userId}`)
    } 4
    res.status(StatusCodes.OK).json("Deleted cart");
}

const getUserCart = async (req, res) => {
    console.log(req.params)
    try {
        const userCart = await Cart.findOne({ userId: req.params.id });
        res.status(StatusCodes.OK).json(userCart);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}

//all carts of all users
const getAllCarts = async (req, res) => {
    try {
        const allCarts = await Cart.find();
        res.status(StatusCodes.OK).json(allCarts);

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}


module.exports = {
    createCart,
    updateCart,
    deleteCart,
    getAllCarts,
    getUserCart
}

