const asyncHandler = require('express-async-handler');
const bcrypt = require("bcrypt");
const jwt = require("bcrypt");
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
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error("All fields are mandatory!");
    }
    const user = await User.findOne({ email });
    //compare password with hashedpassword
    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = jwt.sign(
        {
          user: {
            username: user.username,
            email: user.email,
            id: user.id,
          },
        },
        process.env.ACCESS_TOKEN_SECERT,
        { expiresIn: "15m" }
      );
      res.status(200).json({ accessToken });
    } else {
      res.status(401);
      throw new Error("email or password is not valid");
    }
  });

const current = asyncHandler(async (req, res) => {
    res.json({message: "current user"})
})

module.exports = {
    register,
    login,
    current
}