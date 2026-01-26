import mongoose from "mongoose";
const { Schema, model } = mongoose;

const FoodItems = new Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
});

export default model("food_Items", FoodItems);
