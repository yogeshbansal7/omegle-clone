const User = require("../models/user")
const asyncHandler = require("express-async-handler")
const { validationResult } = require("express-validator")
const sendToken = require("../utils/jwtToken")

const signup = asyncHandler(async (req, res, next) => {
    const { fullName, gender, userName, password, interest } = req.body;

    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })

    const user = await User.create({ fullName, gender, userName, password, interest });

    sendToken(user, 201, "User registered successfully", res)
})