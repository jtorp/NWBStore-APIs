const jwt = require('jsonwebtoken');
const User = require("../models/User");
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');


const authenticateUser = async (req, res, next)=>{
    const authHeader = req.headers.authorization
    let token;
    if (authHeader && authHeader.startsWith('Bearer'))   {
     token = authHeader.split(' ')[1]
    }
    if (!token) {
        throw new CustomError.UnauthenticatedError('Authentication Invalid - invalid token');
      }
      try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { userId: payload.userId, firstname: payload.firstname, isAdmin: payload.isAdmin }
        next()
    } catch (error) {
        throw new CustomError.UnauthenticatedError('Authentication Error');
    }

}
//check if user params id & for permissions to modify own data ( update/delete)
const authUserAndCheckPermissions = async(req,res, next)=>{
  if(req.user.userId === req.params.id || req.user.isAdmin){
      next();
    }else{
     throw new CustomError.UnauthorizedError('Access denied. You are not allowed to do that!')
    }
}

//check for admin permissions 
const authorizeAdminPermissions = (req, res, next) => {
  if (req.user.isAdmin) {
    next()
  } else {
    throw new CustomError.UnauthorizedError(
      'Unauthorized to access this route / Must be an admin'
    );
  }
};

module.exports = {
    authenticateUser,
    authorizeAdminPermissions,
    authUserAndCheckPermissions
}