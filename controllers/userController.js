const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CryptoJS = require("crypto-js");
const CustomError = require('../errors');


//admin functions
const getAllUsers = async (req, res) => {
  const usersAll = await User.find({ name: 'users' }).select("-password")
  const usersNew = await User.find({ name: 'users' }).select("-password").limit(5).sort({ _id: -1 })
  const query = req.query.new
  const users = query ? usersNew : usersAll
  res.status(StatusCodes.OK).json({ users, count: users.length })
};

const getSingleUser = async (req, res) => {
  const user = await User.findById({ _id: req.params.id }).select('-password')
  console.log(user)
  if (!user) {
    throw new CustomError.NotFoundError(`No user with following id ${req.params.id}`)
  }
  res.status(StatusCodes.OK).json({ user });
}

const getUserStats = async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  const data = await User.aggregate([
    { $match: { createdAt: { $gte: lastYear } } },
    {
      $project: {
        month: { $month: "$createdAt" },
      },
    },
    {
      $group: {
        _id: "$month", userCount: { $sum: 1 }
      }
    }
  ])

  res.status(StatusCodes.OK).json(data)
}


const updateUser = async (req, res) => {
  const { firstname, lastname, email } = req.body;
  if (!email || !firstname || !lastname) {
    throw new CustomError.BadRequestError('Please provide missing values');
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body
    },
    { new: true, runValidators: true, select: { email, firstname, lastname } }
  )
  res.status(StatusCodes.OK).json({ user: updatedUser })
}

//when user logged in and want to update password
const updateUserPassword = async (req, res) => {
  const { newPassword, newPasswordConfirm } = req.body;
  const user = await User.findOne({ _id: req.user.userId });

  if (!newPasswordConfirm || !newPassword) {
    throw new CustomError.BadRequestError('Please provide missing values');
  }
  if (newPasswordConfirm !== newPassword) {
    throw new CustomError.BadRequestError('Passwords do not match')
  }
  user.password = newPassword;
  await user.save();
  res.status(StatusCodes.OK).json({ msg: 'Password updated successfully' });
}

const deleteUser = async (req, res) => {
  const {
    params: { id: userId },
  } = req
  await User.findByIdAndDelete(userId);

  if (!userId) {
    throw new CustomError.NotFoundError("No user found")
  }
  res.status(StatusCodes.OK).json({ msg: 'Profile deleted successfully' });
}

module.exports = {
  getAllUsers,
  getSingleUser, getUserStats,
  deleteUser,
  updateUser,
  updateUserPassword
};

