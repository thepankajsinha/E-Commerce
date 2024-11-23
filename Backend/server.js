import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./lib/database.js";

//import routes
import authRoutes from "./routes/authRoute.js";
import productRoutes from "./routes/product.route.js";
// import cartRoutes from "./routes/cart.route.js";
// import couponRoutes from "./routes/coupon.route.js";
// import paymentRoutes from "./routes/payment.route.js";
// import analyticsRoutes from "./routes/analytics.route.js";



dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json({ limit: "10mb" })); // allows you to parse the body of the request
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
// app.use("/api/cart", cartRoutes);
// app.use("/api/coupons", couponRoutes);
// app.use("/api/payments", paymentRoutes);
// app.use("/api/analytics", analyticsRoutes);


app.listen(PORT, () => {
	console.log("Server is running on port " + PORT);
	connectDB();
});

