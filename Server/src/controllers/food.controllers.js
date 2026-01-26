import FoodsModal from "../models/food.model.js";

export const addFood = async (req, res) => {
  const userId = req.user.id;
  try {
    const { title, category, price } = req.body;

    if (!title || !category || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }
    await FoodsModal.create({
      userId,
      title,
      category,
      price,
    });
    res.status(200).json({ message: "Food added successfully" });
  } catch (e) {
    console.error("ADD FOOD ERROR:", e);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateFood = async (req, res) => {
  try {
    const { _id, title, category, price } = req.body;

    const updated = await FoodsModal.findByIdAndUpdate(
      _id,
      { title, category, price },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food updated" });
  } catch (e) {
    res.status(500).json({ message: "Update failed" });
  }
};

export const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const deleted = await FoodsModal.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json({ message: "Food deleted successfully" });
  } catch (error) {
    console.error("DELETE FOOD ERROR:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllFoods = async (req, res) => {
  const userId = req.user.id;
  try {
    const foods = await FoodsModal.find({ userId });
    res.status(200).json(foods);
  } catch (error) {
    console.error("Error fetching food items:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
