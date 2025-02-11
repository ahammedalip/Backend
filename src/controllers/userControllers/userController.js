import Product from "../../model/product.js";

// Get all products with quantity > 1
export const getAvailableProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $gt: 1 } });

    if (!products.length) {
      return res.status(404).json({ message: "No available products found" });
    }

    res.status(200).json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error, please try again later" });
  }
};


