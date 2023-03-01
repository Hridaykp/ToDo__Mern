import bycryptjs from 'bcryptjs';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

export const register = async(req, res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        return res.json ("required name, email, password !!!");
    }

    try{
        const salt = await bycrptjs.genSalt(10);
        const hashedPassword = await bycrptjs.hash(req.body.password, salt);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        });
      
        await newUser.save();
        return res.status(201).json('New User Created');
    }catch(err){
        console.log(err);
        return res.json("server error");
    }
}


export const login = async(req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.json("Email and password are required")
    }

    try{
        const user = await User.findOne({ email: req.body.email }).select(
            'name email password',
        );
        if(!user){
            return res.status(404).json("No user found !!");
        }
        const isCorrectPassword = await bycryptjs.compare(req.body.password, user.password);
        if(!isCorrectPassword){
            return res.json("Password incorrect");
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
        return res.json("server error");
    }
}



