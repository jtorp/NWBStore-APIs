const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const CryptoJS = require("crypto-js");
const CustomError = require('../errors');

const register = async (req, res) => {
    const { email, firstname, lastname, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        throw new CustomError.BadRequestError('Please provide full name, email and password');
    }
    const emailAlreadyExists = await User.findOne({ email });
    if (emailAlreadyExists) {
        throw new CustomError.BadRequestError('Email already in use');
    }
    const user = await User.create({ firstname, lastname, email, password });
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json(
        { user: { firstname: user.firstname }, token });

};

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new CustomError.BadRequestError('Please provide email and password');
    }

    const user = await User.findOne({ email })
    if (!user) {
        throw new CustomError.UnauthenticatedError('Invalid email');
    }
    const hashedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PHRASE)
    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);
    originalPassword !== password && res.status(StatusCodes.UNAUTHORIZED).json({ msg: "Invalid password" })

    const token = user.createJWT()
    res.status(StatusCodes.OK).json({ user: { firstname: user.firstname }, token })

}


const logout = async (req, res) => {
    //attach cookie
    res.status(StatusCodes.OK).json({ msg: "user logged out - success!" })
}

module.exports = {
    register,
    login,
    logout
};
