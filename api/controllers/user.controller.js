import { errorHandler } from "../utils/error.js";
import bcryptjs from 'bcryptjs';
import User from "../models/user.model.js";


export const test= (req,res)=>{
    res.json({message : 'API is working!'});
}; 

export const updateUser = async (req,res,next)=>{
    if (req.user.id !== req.params.userId )
    {
        return next(errorHandler(403,'You are not authorized to update this user'));
    }
    if (req.body.password)
    {
        if (req.body.password.length<6)
        {
            return next(errorHandler(400,'Password Must be at Least 6 character!'));
        }
        else
        {
            req.body.password =bcryptjs.hashSync(req.body.password,10);
        }
    }
    if (req.body.username)
    {
        if (req.body.username.length<7 || req.body.username>20)
        {
            return next(errorHandler(400,'Username Must be between 7 and 20 character!'));
        }
    }
    if (req.body.username.includes(' '))
    {
        return next(errorHandler(400,'Username Must not contain spaces!'));
    }
    if (req.body.username!== req.body.username.toLowerCase())
    {
        return next(errorHandler(400,'Username Must be in lowercase!'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/))
    {
        return next(errorHandler(400,'Username Must contain only letters and numbers!'));
    }
    try {
        const updatedUser= await User.findByIdAndUpdate(req.params.userId, {
            $set:  {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password ,
                profilePicture: req.body.profilePicture,
            },
        },{new :true});
        const {password ,...rest} =updatedUser._doc;
        res.status(200).json(rest);
    } catch (error) {
        next(error);
    }
    // console.log(req.body);

}