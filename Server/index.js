import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import hotelRoutes from "./src/routes/hotel.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import foodRouter from "./src/routes/food.routes.js";
import guestRoutes from "./src/routes/guest.routes.js";
import orderRoutes from "./src/routes/order.routes.js";
import reviewRoutes from "./src/routes/review.routes.js";
import { connectDB } from "./src/lib/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use("/auth", authRouter);
app.use("/food", foodRouter);
app.use("/order", orderRoutes);
app.use("/hotel", hotelRoutes);
app.use("/guest", guestRoutes);
app.use("/review", reviewRoutes);

// For ES Module
const __dirname = path.resolve();

// Serve frontend build
app.use(express.static(path.join(__dirname, "Client", "dist")));

// React Router fallback
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "Client", "dist", "index.html")
  );
});

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server error `, err);
  });
