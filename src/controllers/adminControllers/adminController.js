import req from "express/lib/request.js";
import Product from "../../model/product.js";

export const addProduct = async (req, res) => {
    try {
        console.log("Received Data:", req.body);

        const { name, quantity, description, imageUrl } = req.body;

        const newProduct = new Product({
            name,
            quantity: Number(quantity),
            description,
            imageUrl,
        });

        await newProduct.save();
        return res.status(201).json({ success: true, message: "Product added successfully", product: newProduct });

    } catch (error) {
        console.error("Error adding product:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getProducts = async (req, res) => {
    try {
        
        const products = await Product.find()

        res.status(200).json({
            success: true,
            products,
            
        });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
};


export const editProduct = async (req, res) => {
    console.log('coming hrer', req.body);
    try {
        const { id } = req.params
        const updateData = req.body; // Get updated fields from request body

        const updatedProduct = await Product.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({success:true, message: "Product updated successfully", updatedProduct });
    } catch (err) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }


}

// delete product
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error deleting product" });
    }
}




