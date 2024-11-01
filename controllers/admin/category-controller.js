const { imageUploadUtil } = require("../../helpers/cloudinary");
const Category = require("../../models/Category");

const handleImageUpload = async (req, res) => {
  try {
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUploadUtil(url);

    res.json({
      success: true,
      imageUrl: result.secure_url,
    });
  } catch (error) {
    console.error("Image upload error:", error);
    res.status(500).json({ success: false, message: "Image upload failed" });
  }
};

const addCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    const newlyCreatedCategory = new Category({ image: imageUrl, title });

    await newlyCreatedCategory.save();
    res.status(201).json({ success: true, data: newlyCreatedCategory });
  } catch (error) {
    console.error("Add category error:", error);
    res
      .status(500)
      .json({ success: false, message: "Category creation failed" });
  }
};

const editCategory = async (req, res) => {
  const { id } = req.params;
  const { title, imageUrl } = req.body;

  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { title, image: imageUrl },
      { new: true }
    );

    if (!updatedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, data: updatedCategory });
  } catch (error) {
    console.error("Edit category error:", error);
    res.status(500).json({ success: false, message: "Category update failed" });
  }
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    res.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Delete category error:", error);
    res
      .status(500)
      .json({ success: false, message: "Category deletion failed" });
  }
};

const fetchAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ success: true, data: categories });
  } catch (error) {
    console.error("Fetch categories error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch categories" });
  }
};

const fetchCategoryById = async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id).populate("products");
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    return res.status(200).json({ data: category });
  } catch (error) {
    console.error("Error fetching category:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
module.exports = {
  handleImageUpload,
  addCategory,
  editCategory,
  deleteCategory,
  fetchAllCategories,
  fetchCategoryById,
};
