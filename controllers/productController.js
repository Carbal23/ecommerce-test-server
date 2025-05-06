import Product from "../models/Product.js";

export const createProduct = async (req, res, next) => {
  try {
    const {
      title,
      description,
      price,
      brand,
      stock,
      category,
      images = [],
    } = req.body;

    // const mappedImages = images.map((filename) => ({
    //   url: `/uploads/images/${filename}`,
    //   alt: filename,
    // }));

    const mappedImages = images.map((image) => ({
      url: image,
      alt: title,
    }));

    const product = new Product({
      title,
      description,
      price,
      brand,
      stock,
      category,
      images: mappedImages,
    });

    await product.save();
    const { __v, ...productWithoutV } = product.toObject();
    res.status(201).json({ success: true, product: productWithoutV });
  } catch (error) {
    next(error);
  }
};

export const getProducts = async (req, res, next) => {
  try {
    const { search = "" } = req.query;
    const query = search ? { title: { $regex: search, $options: "i" } } : {};

    const products = await Product.find(query).limit(50).select("-__v");
    res.json({ success: true, count: products.length, products });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).select("-__v");

    if (!product) {
      const error = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
    }

    res.json({ success: true, product });
  } catch (error) {
    next(error);
  }
};

export const rateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rating } = req.body;

    const product = await Product.findById(id);
    if (!product) {
      const error = new Error("Producto no encontrado");
      error.statusCode = 404;
      throw error;
    }

    product.rating.count += 1;
    product.rating.average =
      (product.rating.average * (product.rating.count - 1) + Number(rating)) /
      product.rating.count;

    await product.save();
    res.json({ success: true, rating: product.rating });
  } catch (error) {
    next(error);
  }
};
