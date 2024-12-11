const User = require("../models/User");
const cloudinary = require("../config/cloudinary");

const updateUser = async (req, res) => {
    const {name, email} = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            user.avatar = result.secure_url;
        }
        user.name = name || user.name;
        user.email = email || user.email;

        const updatedUser = await user.save();
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {updateUser}