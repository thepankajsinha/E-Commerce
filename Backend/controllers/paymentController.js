export const createCheckoutSession = async (req, res) => {
    try {
        const products = await Product.find({_id: {$in : req.user.cartItems}})

        //add quantity for each product
        const cartItems = products.map((product)=> {
            const item = req.user.cartItems.find((cartItem)=> cartItem.id === product.id);
            return {...product.toJSON(), quantity: item.quantity};
        })
        
        res.json(cartItems);
        
    } catch (error) {
        console.log("Error in getCartProducts", error.message);
        res.status(500).json({ message: "Error in getCartProducts", error: error.message });
    }
}