const jwt = require('jsonwebtoken')
const User = require('../models/users')
const bcrypt = require('bcrypt')


const registerUser = async (req, res) => {

    try{
        const {email, password} = req.body;
        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.status(400).json({status: "bad", message: "email already existis"})
        }

        const newUser = new User({email, password});
        await newUser.save();

        res.status(201).json({status: "ok", message: "user created successfully."})
    }
    catch(error){
        if (process.env.APP_STATE == "dev"){
            return res.status(500).json({status: "bad", message: "something went wrong", error: error.message})
        }
        else{
            return res.status(500).json({status: "bad", message: "something went wrong"})
        }

    }
}

const loginUser = async (req, res) => {

    try{
        const {email, password} = req.body

        if (!email || !password){
            return res.status(400).json({status: "bad", message: "email or password is missing"})
        }

        const user = await User.findOne({email})
        
        if (!user){
            return res.status(400).json({status: "bad", message: "email or password are wrong"})
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if(!isPasswordCorrect){
            return res.status(400).json({status: "bad", message: "email or password are wrong"})
        }

        const token = jwt.sign(
            {id: user._id, email: user.email},
            process.env.ACCESS_TOKEN_SECRET,
            {expiresIn: "2h"}
        );
        
        res.status(200).json({status: "ok", message: "login successful.", access_token: token})
    }
        catch(error){
        if (process.env.APP_STATE == "dev"){
            return res.status(500).json({status: "bad", message: "something went wrong", error: error.message})
        }
        else{
            return res.status(500).json({status: "bad", message: "something went wrong"})
        }

    }
};


module.exports = {registerUser, loginUser}