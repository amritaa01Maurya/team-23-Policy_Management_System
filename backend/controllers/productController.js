import { Product } from "../models/Product.js";
import { logAction } from "../utils/auditLogger.js";

export const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    await logAction({
      userId: req.user._id,
      action: "CREATE_PRODUCT",
      entityType: "PRODUCT",
      entityId: product._id.toString()
    });
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};
