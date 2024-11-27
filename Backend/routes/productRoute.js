import express from "express";
import { createProduct, deleteProduct, getAllProducts, getProductsByCategory} from "../controllers/productController.js";
import { adminRoute, protectRoute } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/category/:category", getProductsByCategory);
router.post("/", protectRoute, adminRoute, createProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);


export default router;