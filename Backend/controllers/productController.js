import Product from "../models/productModel.js"

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.json({products});
    } catch (error) {
        console.log("Error in getAllProducts", error.message);
        res.status(500).json({ message: "Error in getAllProducts", error: error.message });
    }
}


export const getFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await Product.find({isFeatured: true}).lean();

        if(!featuredProducts){
            return res.status(404).json({ message: "No featured products found" });
        }
        res.json(featuredProducts);
    } catch (error) {
        console.log("Error in getFeaturedProducts", error.message);
        res.status(500).json({ message: "Error in getFeaturedProducts", error: error.message });
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

        await Product.findByIdAndDelete(request.params.id);
        res.json({ message: "Product deleted successfully" });

    } catch (error) {
        console.log("Error in deleteProduct", error.message);
        res.status(500).json({ message: "Error in deleteProduct", error: error.message });
    }
}


export const getRecommendedProducts = async (req, res) => {
    try {
        const products = await Product.aggregate([
            {
                $sample: { size: 3 }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    description: 1,
                    price: 1,
                    image: 1
                }
            }
        ]);
        
        res.json(products);
    } catch (error) {
        console.log("Error in getRecommendedProducts", error.message);
        res.status(500).json({ message: "Error in getRecommendedProducts", error: error.message });
    }
}