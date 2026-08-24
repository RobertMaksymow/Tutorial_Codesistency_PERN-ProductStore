import express from "express";
import {
  getAllProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);

router.post("/", createProduct);

router.get("/:id", getProductById);

router.put("/:id", updateProductById);

router.delete("/:id", deleteProductById);

router.put("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Updates a product with ID: ${id}`);
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`Deletes a product with ID: ${id}`);
});

export default router;
