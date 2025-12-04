import { Product } from "../models/Product.js";
import { calculatePremium } from "../utils/premiumEngine.js";

export const calculate = async (req, res, next) => {
  try {
    const { productId, age, vehicleYear, idv } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "product not found" });

    const premium = calculatePremium({
      product,
      age,
      vehicleYear,
      idv
    });

    res.json({ premium });
  } catch (err) {
    next(err);
  }
};
