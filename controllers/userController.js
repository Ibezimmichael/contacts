const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const register = asyncHandler(async (req, res) => {
    const {username, email, password} = req.body
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await new User({ username, email, password: hashedPassword });
    await user.save();
    // const user = await User.create({
    //     username,
    //     email,
    //     password: hashedPassword,
    // });
    console.log(user);
    if (user) {
        res.status(201).json({message:'User created', _id: user.id, email: user.email})
    }else {
        res.status(400);
        throw new Error("user data not valid")
    }
    console.log(hashedPassword);
    res.json({message: "Register the user"})
});

const login = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        res.status(400);
        // throw new Error("All fields are mandatory")
        return;
    }
    const user = await User.findOne({email});
    if (user && (await bcrypt.compare(password, user.password))) {
        const token = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },      
        }, 
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "35m"}

        )
        res.status(200).json({token})
    }else {
        res.status(401);
        throw new Error("email or password not valid")
    }
})

const current = asyncHandler(async (req, res) => {
    res.json(req.user)
})

module.exports = {
    register,
    login,
    current
}