import express from "express";
const router = express.Router();
import Category from "../models/categoryModel.js";
import Post from "../models/postModel.js"; // Import the Post model

// Create a new category
router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json(savedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all categories
router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json(cats);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get categories with post counts
router.get("/with-post-counts", async (req, res) => {
  try {
    // Aggregate post counts per category
    const categoriesWithCounts = await Category.aggregate([
      {
        $lookup: {
          from: "posts", // The collection name for posts
          localField: "name",
          foreignField: "categories",
          as: "posts",
        },
      },
      {
        $project: {
          name: 1,
          postCount: { $size: "$posts" },
        },
      },
    ]);
    res.status(200).json(categoriesWithCounts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a category
router.put("/:id", async (req, res) => {
  try {
    const updatedCat = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    res.status(200).json(updatedCat);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete a category
router.delete("/:id", async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Category deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
});

export { router };
