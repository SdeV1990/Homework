import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import UserModel from "../models/user.js"
import dotenv from 'dotenv'

dotenv.config()

// Secret key
const secret = process.env.secret || 'QHhpZGlvCg=='

// Sigh in
export const signin = async (req, res) => {

    const { email, password } = req.body

    try {

        // Get user by email
        const oldUser = await UserModel.findOne({ email })

        // If user doesn't exist - return error
        if (!oldUser) return res.status(404).json({ message: "User doesn't exist" })

        // Check password
        const isPasswordCorrect = await bcrypt.compare(password, oldUser.password)

        // If password is't correct - return error
        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" })

        // Create token
        const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, { expiresIn: "1d" })

        res.status(200).json({ result: oldUser, token })
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" })
    }
};

// Sign up
export const signup = async (req, res) => {

    const { email, password, firstName, lastName } = req.body
    // console.log(req.body)

    try {

        // Get user by email
        const oldUser = await UserModel.findOne({ email })

        // If user is already exist - return error
        if (oldUser) return res.status(400).json({ message: "User already exists" })

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12)

        // Save user data
        const result = await UserModel.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` })

        // Create token
        const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1d" } )

        res.status(201).json({ result, token })
    } catch (error) {
        res.status(500).json({ message: "Something went wrong" })
        
        console.log(error)
    }
}
