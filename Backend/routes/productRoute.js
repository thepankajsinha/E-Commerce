import express from "express";
import { createProduct, deleteProduct, getAllProducts, getFeaturedProducts, getRecommendedProducts } from "../controllers/productController.js";
import { adminRoute, protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/recommendations", getRecommendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);


export default router;