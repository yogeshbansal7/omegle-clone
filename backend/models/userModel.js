const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    gender: {
        type: String,
        required: true,
        minLength: 4,
        maxLength: 6,

    },
    userName: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 50,
        unique: true
    },
    password: {
        type: String,
        minLength: 6,
        required: true
    },
    avatar: {
        type: String,
        default: ''
    },
    interest: {
        type: String,
        default: ''
    }
}, { timestamps: true });

// Password hashing
userSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next()
    }

    this.password = await bcrypt.hash(this.password, 10)
})

// JWT token
userSchema.methods.getJWTToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

// Password compare
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

module.exports = mongoose.model("User", userSchema);