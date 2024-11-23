import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const signup = async (req, res) => {
  try {

    // Validate request body
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please enter all fields" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Create and send JWT token
    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        //set token in cookies
        res.cookie('accessToken', accessToken,{
            httpOnly: true,
            maxAge: 3*24*60*60*1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

    res.status(201).json({ message: "User created successfully", user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
  
    } });
  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({ message: "Error in signup" });
  }
};

export const login = async (req, res) => {
    try {
        // Validate request body
        const { email, password } = req.body;
        
        if (!email ||!password) {
            return res.status(400).json({ message: "Please enter all fields" });
        }
        
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid Password" });
        }
        
        // Create and send JWT token
        const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '3d' });
        //set token in cookies
        res.cookie('accessToken', accessToken,{
            httpOnly: true,
            maxAge: 3*24*60*60*1000,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });
        
        res.json({ message: "Logged in successfully", user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        } })
        
    } catch (error) {
        console.log("Error in login", error.message);
        res.status(500).json({ message: "Error in login", error: error.message });
    }
};

export const logout = async (req, res) => {
    try {

        // Clear access token from cookies
        res.clearCookie("accessToken");
        
        res.json({ message: "Logged out successfully" });
        
    } catch (error) {
        console.log("Error in logout", error.message);
        res.status(500).json({ message: "Error in logout", error: error.message });
    }
};

export const getProfile = async (req, res) => {};
