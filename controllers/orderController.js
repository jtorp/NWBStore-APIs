const Order = require('../models/Order');
const Product = require('../models/Product');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');



const createOrder = async (req, res) => {
    const order = new Order(req.body)
    try {
        const newOrder = await order.save();
        res.status(StatusCodes.CREATED).json(newOrder);
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}


const updateOrder = async (req, res) => {

    try {
        const {id:orderId} = req.params;
        const updatedOrder = await Order.findOneAndUpdate({ _id: orderId }, {
            $set: req.body,
        }, 
        {
            new: true, runValidators:true
        })
        res.status(StatusCodes.OK).json({updatedOrder});
console.log(req.params.id)
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}

const deleteOrder = async (req, res) => {
    const { id: orderId } = req.params;
    const order = await Order.findOneAndDelete({ _id: orderId });
    if (!order) {
      throw new CustomError.NotFoundError(`No order with id : ${orderId}`);
    }
    res.status(StatusCodes.OK).json("Order deleted");
}

const getUserOrder = async (req, res) => {
    try {
        const userOrders = await Order.find({ userId: req.params.id });
        res.status(StatusCodes.OK).json({userOrders, count: userOrders.length});
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json(error);
    }
}



const getAllOrders = async (req, res) => {
    try {
        const allOrders = await Order.find();
        res.status(StatusCodes.OK).json({allOrders, count: allOrders.length});

    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
}

//stats for month
const getIncomeStats = async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));

    try {
        const income = await Order.aggregate([
            { $match: { createdAt: { $gte: prevMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$total"
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                }
            }
        ]);
        res.status(StatusCodes.OK).json(income)
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error)
    }
}

module.exports={
    createOrder,
    updateOrder,
    deleteOrder,
    getUserOrder,
    getAllOrders,
    getIncomeStats,
}

