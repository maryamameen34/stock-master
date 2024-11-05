const Notification = require("../models/notification.js");
const Product = require("../models/product.js");

exports.UploadProduct = async (req, res, next) => {
  const {
    title,
    sku,
    description,
    main_category,
    category,
    subcategory,
    brand,
    tags,
    unit,
    is_new,
    attributes,
    variants,
    price,
    salePrice,
    discount,
    stockQuantity,
    specifications,
    shipping_options,
    shipping_dimensions,
    shipping_cost,
    handling_time,
    returnPolicy,
    warranty,
    createdBy,
    featured,
  } = req.body;

  try {
    const main_image = req.files.main_image
      ? req.files.main_image[0].path
      : null;
    const additional_images = req.files.additional_images
      ? req.files.additional_images.map((file) => file.path)
      : [];
    const video_file = req.files.video_file
      ? req.files.video_file[0].path
      : null;

    const newProduct = new Product({
      title,
      sku,
      description,
      main_category,
      category,
      subcategory,
      brand,
      tags,
      unit,
      is_new,
      attributes,
      variants,
      price,
      salePrice,
      discount,
      stockQuantity,
      specifications,
      shipping_options,
      shipping_dimensions,
      shipping_cost,
      handling_time,
      returnPolicy,
      warranty,
      createdBy,
      featured,
      main_image,
      additional_images,
      video_url: video_file,
    });

    const notification = await Notification.create({
      admin_message: `${newProduct.title} -  added successfully`,
      read: false,
    });
    await newProduct.save();

    res.status(201).json({ success: true, product: newProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products: products || [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getProductById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.filterProdcuts = async (req, res) => {
  const { query } = req.query;

  try {
    const regex = new RegExp(query, "i");

    const products = await Product.find({
      $or: [
        { title: { $regex: regex } },
        { description: { $regex: regex } },
        { tags: { $regex: regex } },
      ],
      status: "active",
    });

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Check if req.files is defined before accessing main_image, additional_images, and video_file
    const main_image =
      req.files && req.files.main_image
        ? req.files.main_image[0].path
        : product.main_image;
    const additional_images =
      req.files && req.files.additional_images
        ? req.files.additional_images.map((file) => file.path)
        : product.additional_images;
    const video_file =
      req.files && req.files.video_file
        ? req.files.video_file[0].path
        : product.video_url;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { ...updatedData, main_image, additional_images, video_url: video_file },
      { new: true }
    );

    res.status(200).json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
