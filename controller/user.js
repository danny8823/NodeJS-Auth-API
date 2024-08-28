const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/User')
require('dotenv').config()

const userCtrl = {
    //! -- REGISTER
    register: asyncHandler(async (req,res) => {
        try{
            const {username,email,password} = req.body

            // ? =====       VALIDATE       =======
            if (!username || !email || !password) {
                throw new Error('Please all fields are required')
            }

            // ? ===== CHECK IF USER EXISTS =======
            const userExists = await User.findOne({email})

            if(userExists) {
                throw new Error('USER ALREADY EXISTS....')
            }

            // ? ======== HASH PASSWORD ===========
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)

            // ? ======== CREATE THE USER =========
            const userCreated = await User.create({
                username,
                email,
                password:hashedPassword
            })

            res.json({
                id: userCreated._id,
                username: userCreated.username,
                email: userCreated.email,
            })

        }catch(error) {
            throw new Error(error.message)
        }
    }),
    //! -- LOGIN
    login: asyncHandler(async (req,res) => {
        const {email,password} = req.body
        // ? ====   CHECK IF USER EMAIL EXISTS    ====
        const user = await User.findOne({email})

        if(!user) {
            throw new Error('Invalid credentials....')
        }
        // ? ==== CHECK IF USER PASSWORD IS VALID ====
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            throw new Error('Invalid credentials....')
        }

        // ? ====        GENERATE THE TOKEN       ====
        const token = jwt.sign(
            {id: user._id}, 
            process.env.JWT_SECRET,
            {expiresIn: '30d'} 
        )

        // ? ====      SEND THE RESPONSE          ====
        res.json({
            message: 'LOGIN SUCCESS..',
            token,
            id: user._id,
            email: user.email,
            username: user.username
        })
    }),
    //! -- PROFILE
    profile: asyncHandler(async (req,res) => {
        // ? ====  FIND THE USER ====
        const user = await User.findById("66cf4d9d64214ed06c826048")

        res.json({
            user
        })
    })
}

module.exports = userCtrl;