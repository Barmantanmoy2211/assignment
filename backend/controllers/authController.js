const User = require("../models/User.js");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, { expiresIn: "30d"});
}

const registerUser = async (req, res) => {
    const {name, email, password} = req.body;

    try {
        const existingUser = await User.findOne({email});
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }
        const user = await User.create({name, email, password});
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                token: generateToken(user.id)
            });
        } else {
            res.status(401).json({
                message: "Invalid email or password"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

module.exports = {registerUser, loginUser};
