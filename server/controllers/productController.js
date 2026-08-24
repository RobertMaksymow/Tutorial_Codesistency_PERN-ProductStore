export const getAllProducts = async (req, res) => {
  res.send("Gets all the products!");
};

export const createProduct = (req, res) => {
  res.send("Creates a new product!");
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
