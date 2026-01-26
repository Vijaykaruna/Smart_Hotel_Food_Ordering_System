import { useState } from "react";
import { api } from "../api/axios.js";
import { useLoading } from "../service/LoadingProvider.jsx";

export const foodController = ({ triggerToast }) => {
  const { showLoading, hideLoading } = useLoading();

  const [foodList, setFoodList] = useState([]);

  const getAllFoods = async () => {
    showLoading("Loading food details...");
    try {
      const res = await api.get("/food/foodlist");
      setFoodList(res.data);
    } catch (err) {
      triggerToast({
        type: "danger",
        message: err.response?.data?.message || "Something went wrong",
      });
    } finally {
      hideLoading();
    }
  };

  const deleteFood = async (foodId) => {
    showLoading("Deleting food from list...");
    try {
      const res = await api.delete(`/food/delete/${foodId}`);

      triggerToast({
        type: "success",
        message: res.data.message || "Food deleted successfully",
      });

      await getAllFoods();
    } catch (error) {
      triggerToast({
        type: "danger",
        message: error.response?.data?.message || "Something went wrong",
      });
    } finally {
      hideLoading();
    }
  };

  const addNewFood = async (addFoodDetails) => {
    showLoading("Adding food to list...");
    try {
      const res = await api.post("/food/addfood", {
        title: addFoodDetails.title,
        category: addFoodDetails.category,
        price: addFoodDetails.price,
      });

      triggerToast({
        type: "success",
        message: res.data.message,
      });
      await getAllFoods();
    } catch (error) {
      triggerToast({
        type: "danger",
        message: error.response?.data?.message || "Something went wrong....",
      });
    } finally {
      hideLoading();
    }
  };

  const updateFood = async (id, updatedFood) => {
    showLoading("Updating food...");
    try {
      await api.put("/food/updatefood", {
        _id: id,
        title: updatedFood.title,
        category: updatedFood.category,
        price: updatedFood.price,
      });

      triggerToast({ type: "success", message: "Food updated" });
      await getAllFoods();
    } catch (e) {
      triggerToast({
        type: "danger",
        message: e.response?.data?.message || "Update failed",
      });
    } finally {
      hideLoading();
    }
  };

  return { foodList, getAllFoods, deleteFood, addNewFood, updateFood };
};
