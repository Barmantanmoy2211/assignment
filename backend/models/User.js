const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "",
    }
}, {timestamps: true});

//password hashing
userSchema.pre("save", async (next) => {
    if (!this.isModified("password")) return next();

    //10 rounds of salting
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//password comparison
userSchema.methods.matchPassword = async (enteredPassword) => {
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model("User",userSchema);