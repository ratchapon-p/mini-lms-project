const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const usersCtrl = {
    //* register
    register: asyncHandler(async(req, res) =>{
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            throw new Error("All field are required")
        }

        const userExists = await User.findOne({email})
        if(userExists){
            throw new Error("User already Exists")
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword
        })
        //send response
        res.json({
            username: userCreated.username,
            email: userCreated.email,
            role: userCreated.role,
            id: userCreated._id,
            
        })
    }),

    //* login
    login: asyncHandler(async(req, res) =>{
        const {email, password} = req.body

        //!Check if user exists
        const user = await User.findOne({email})

        if(!user){
            throw new Error('Invalid email or password')
        }

        //!Check password valid
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
            res.status(410)
            throw new Error('Invalid email or password')
        }

        //!Generate token
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn: '30d'})

        //!Send response
        res.json({
            message: "Login success",
            token,
            id: user._id,
            email: user.email
        })

    }),

    //* Profile
    profile: asyncHandler(async(req, res) =>{
        res.json({
            message: "Welcome to your porfile"
        })
    })

}


module.exports = usersCtrl;