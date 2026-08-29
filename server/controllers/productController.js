import clientSQL from "../config/db.js"; // Import the database client

// CRUD operations on database for Products

export const getAllProducts = async (req, res) => {
  try {
    const products = await clientSQL`SELECT * FROM products`;
    res.status(200).json({ success: true, data: products });
    console.log("Fetched products:", products); // Log the fetched products for debugging
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await clientSQL`SELECT * FROM products WHERE id = ${id}`;
    if (product.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: product[0] });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createProduct = async (req, res) => {
  const { name, image, description, price } = req.body;
  if (!name || !image || !description || !price) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    const newProduct =
      await clientSQL`INSERT INTO products (name, image, description, price) 
      VALUES (${name}, ${image}, ${description}, ${price}) RETURNING *
      `;
    console.log("Created new product:", newProduct); // Log the created product for debugging
    res.status(201).json({ success: true, data: newProduct[0] });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Failed to create product" });
  }
};
export const updateProductById = async (req, res) => {
  const { id } = req.params;
  const { name, image, description, price } = req.body;
  try {
    const updatedProduct = await clientSQL`UPDATE products 
    SET name = ${name}, image = ${image}, description = ${description}, price = ${price} WHERE id = ${id} RETURNING *`;
    if (updatedProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: updatedProduct[0] });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct =
      await clientSQL`DELETE FROM products WHERE id = ${id} RETURNING *`;
    if (deletedProduct.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, data: deletedProduct[0] });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
