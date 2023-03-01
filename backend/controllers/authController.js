import bycryptjs from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import createError from '../utils/error.js';

// for register user
export const register = async(req, res, next) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return next(createError({ status: 400, message: 'Name, Email & Password are required '}));
    }

    try{
        const salt = await bycryptjs.genSalt(10);
        const hashedPassword = await bycryptjs.hash(req.body.password, salt);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
      
        await newUser.save();
        return res.status(201).json('New User Created');
    }catch(err){
        console.log(err);
        return next(err);
    }
}

// for login user
export const login = async(req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(createError({ status: 400, message: 'Email, password is required '}));

    }

    try{
        const user = await User.findOne({ email: req.body.email }).select(
            'name email password',
        );
        if(!user){
            return next(createError({ status: 404, message: 'No user found !!'}));
        }
        const isCorrectPassword = await bycryptjs.compare(req.body.password, user.password);
        if(!isCorrectPassword){
            return next(createError({ status: 400, message: 'Password is incorrect !!'}));

        }
        const payload = {
            id: user._id,
            name: user.name,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: '1d',
        });
        return res.cookie('access_token', token,{
           httpOnly: true}
           )
           .status(200)
           .json({'message': "login successfuly..."});
        
    }catch(err){
        console.log(err);
        return next(err);
    }
}

// for logging out
export const logout = async (req, res) => { 
    res.clearCookie('access_token');
    return res.status(200).json({ message: 'Successfuly logout !!' });
};


// 
export const isLoggedIn = async (req, res) => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.json(false);
    }
    return jwt.verify(token, process.env.JWT_SECRET, (err) => {
        if (err) {
            return res.json(false);
        }
        return res.json(true);
    });
};



