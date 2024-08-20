import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import sharp from "sharp";

import { router as authRoute } from "./routes/auth.js";
import { router as userRoute } from "./routes/users.js";
import { router as postRoute } from "./routes/posts.js";
import { router as categoryRoute } from "./routes/categories.js";
import Post from "./models/postModel.js";

const app = express();

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => {
    console.log(err);
  });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // Store the file with its original extension first
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    const originalFilePath = path.join(__dirname, "images", req.body.name);
    const webpFilePath = originalFilePath.replace(/\.[^/.]+$/, ".webp");

    // Convert the uploaded image to WebP format using sharp
    await sharp(originalFilePath).webp({ quality: 80 }).toFile(webpFilePath);

    const post = new Post({
      title: req.body.title,
      desc: req.body.desc,
      photo: `/images/${req.body.name}`,
      webpPhoto: `/images/${path.basename(webpFilePath)}`,
    });

    await post.save();

    res.status(200).json("File has been uploaded and converted to WebP");
  } catch (error) {
    res.status(500).json({ message: "File upload failed", error });
  }
});

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/categories", categoryRoute);

app.listen(5000, () => {
  console.log("Backend server started");
});
