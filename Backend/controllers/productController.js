import Product from "../models/productModel.js"
import cloudinary from "../lib/cloudinary.js";

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({products});
    } catch (error) {
        console.log("Error in getAllProducts", error.message);
        res.status(500).json({ message: "Error in getAllProducts", error: error.message });
    }
}


export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image } = req.body;

        let cloudinaryResponse = null;

        if(image){
            cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: "products"});
        }

        //create a new product
        const product = await Product.create({
            name,
            description,
            price,
            category,
            image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : "",
        });
        res.status(201).json(product);

    } catch (error) {
        console.log("Error in createProduct", error.message);
        res.status(500).json({ message: "Error in createProduct", error: error.message });
    }
}


export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        
        if(!product){
            return res.status(404).json({ message: "Product not found" });
        }

        if(product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            try {
                await cloudinary.uploader.destroy(`products/${publicId}`);
                console.log("image deleted successfully from cloudinary")
            } catch (error) {
                console.log("Error deleting image from cloudinary", error.message)
            }
        }

        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });

    } catch (error) {
        console.log("Error in deleteProduct", error.message);
        res.status(500).json({ message: "Error in deleteProduct", error: error.message });
    }
}



export const getProductsByCategory = async (req, res) => {
    const category = req.params.category
    try {
        const products = await Product.find({ category });
        res.json({products});
    } catch (error) {
        console.log("Error in getProductsByCategory", error.message);
        res.status(500).json({ message: "Error in getProductsByCategory", error: error.message });
    }
}