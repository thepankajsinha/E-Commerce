import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const protectRoute = async (req, res, next) => {
    try {
        //get the access token from the request cookies
        const accessToken = req.cookies.accessToken;

        //check if access token is provided in request cookies
        if (!accessToken) {
            return res.status(401).json({
                message: "No access token provided"
            });
        }

        //decode access token
        const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);

        //find user from database
        const user = await User.findById(decoded.userId).select("-password");

        //check if user exists in the database
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("Error in  protectRoute", error.message);
        res.status(401).json({
            message: "Error in protectRoute", error: error.message
        });
    }
}

export const adminRoute = async (req, res, next) => {
    try {
        //check if user is an admin
        if (req.user && req.user.role === 'admin') {
            next();
        }
        else{
            return res.status(403).json({
                message: "Unauthorized, Admin only allowed"
            });
        }
            
    } catch (error) {
        console.log("Error in adminRoute", error.message);
        res.status(403).json({
            message: "Error in adminRoute", error: error.message
        });
    }
}