import clientSQL from "../config/db.js"; // Import the database client

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

export const getProductById = (req, res) => {
  const { id } = req.params;
  res.send(`Gets a product with ID: ${id}`);
};

export const updateProductById = (req, res) => {
  const { id } = req.params;
  res.send(`Updates a product with ID: ${id}`);
};

export const deleteProductById = (req, res) => {
  const { id } = req.params;
  res.send(`Deletes a product with ID: ${id}`);
};
