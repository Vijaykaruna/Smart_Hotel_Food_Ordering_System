import Dosa from "../../assets/dosa.png";

import { MdDelete } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { MdModeEditOutline } from "react-icons/md";

import { useFoodPage } from "../../hooks/useFoodPage.js";
import { useEffect, useState } from "react";
import ModalAddFood from "../../components/ModalAddFood.jsx";

const FoodPage = ({ foodControl }) => {
  const useFood = useFoodPage({ foodControl });

  useEffect(() => {
    foodControl.getAllFoods();
  }, []);

  const [activeCategory, setActiveCategory] = useState("BreakFast");
  const getActiveFoods = () => {
    switch (activeCategory) {
      case "BreakFast":
        return useFood.listCategory.breakFast;
      case "Lunch":
        return useFood.listCategory.lunch;
      case "Dinner":
        return useFood.listCategory.dinner;
      case "Refreshment":
        return useFood.listCategory.refreshment;
      default:
        return [];
    }
  };

  const foods = getActiveFoods();

  return (
    <div className="">
      <div className="d-flex gap-1 flex-column flex-lg-row align-items-center my-2 mx-lg-2 mx-0">
        {useFood.FoodsCategory.map(({ title, img, label }, index) => (
          <div
            key={index}
            className={`border col-lg-3 col-8 rounded-3 shadow-lg cursor-pointer
              ${activeCategory === title ? "bg-warning text-dark" : "bg-light"}
            `}
            style={{ cursor: "pointer" }}
            onClick={() => setActiveCategory(title)}
          >
            <div className="d-flex justify-content-around py-2">
              <p className="fs-5 text-secondary">{title}</p>
              <img src={img} alt={`${title}-icon`} className="img-fluid" />
            </div>
            <p className="h3 text-center">{label}</p>
          </div>
        ))}
      </div>

      <ModalAddFood useFood={useFood} />

      <div className="rounded-2 my-5 px-lg-5 px-2 py-2 col-12 bg-light shadow-lg">
        <div className="d-flex justify-content-between align-items-center">
          <p className="h5 my-4">Foods List:</p>
          <button
            className="btn btn-sm btn-primary p-2"
            onClick={() => {
              useFood.setEditingFood(null);
              useFood.setShowAddFoodModal(true);
            }}
          >
            <FaPlusCircle className="fs-3 me-1" /> ADD
          </button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover table-bordered align-middle">
            <thead className="border">
              <tr className="text-center">
                <th scope="col" className="ps-3">
                  Image
                </th>
                <th scope="col">Name</th>
                <th scope="col">Category</th>
                <th scope="col">Price</th>
                <th scope="col" className="ps-lg-5 ps-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {foods.length > 0 ? (
                foods.map((food) => (
                  <tr key={food._id} className="text-center">
                    <td>
                      <img src={Dosa} alt={food.title} className="img-fluid" />
                    </td>
                    <td>{food.title}</td>
                    <td>{food.category}</td>
                    <td>{`Rs.${food.price}`}</td>
                    <td>
                      <div className="d-flex justify-content-around gap-3 btn-group">
                        <button
                          className="btn btn-sm btn-danger d-flex flex-row justify-content-center align-items-center p-1 rounded-2"
                          onClick={() => useFood.handleDeleteFoodById(food._id)}
                        >
                          <MdDelete className="fs-3" />
                        </button>
                        <button
                          className="btn btn-sm btn-primary d-flex flex-row justify-content-center align-items-center p-1 rounded-2"
                          onClick={() => {
                            useFood.setEditingFood(food);
                            useFood.setShowAddFoodModal(true);
                          }}
                        >
                          <MdModeEditOutline className="fs-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    {`No food items available in ${activeCategory}`}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FoodPage;
