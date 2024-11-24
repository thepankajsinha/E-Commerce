import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./lib/database.js";

//import routes
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/productRoute.js";
import cartRoutes from "./routes/cartRoute.js";
import couponRoutes from "./routes/couponRoute.js";
import paymentRoutes from "./routes/paymentRoute.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


//inbuilt middlewares
app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

//use routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);

//listen server and connect database
app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
	connectDB();
});

