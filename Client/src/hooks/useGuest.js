import { useEffect, useState } from "react";
import { publicGuestController } from "../controller/public.guest.controller";

export const useGuest = (userId) => {
  const guestControl = publicGuestController();

  const [listCategory, setListCategory] = useState({
    breakFast: [],
    lunch: [],
    dinner: [],
    refreshment: [],
  });

  const [hotelDetails, setHotelDetails] = useState(null);
  const [guestDetails, setGuestDetails] = useState(null);
  const [guestOrderList, setGuestOrderList] = useState([]);

  const [selectRoom, setSelectRoom] = useState(0);
  const [activeCategory, setActiveCategory] = useState("BreakFast");
  const [cart, setCart] = useState({});
  const [totalAmount, setTotalAmount] = useState(0);

  const category = [
    { name: "Break Fast", label: "BreakFast" },
    { name: "Lunch", label: "Lunch" },
    { name: "Dinner", label: "Dinner" },
    { name: "Refreshment", label: "Refreshment" },
  ];

  const fetchGetFoods = async () => {
    const foodList = await guestControl.getFoodsByUser(userId);

    const breakFast = foodList.filter((food) => food.category === "BreakFast");
    const lunch = foodList.filter((food) => food.category === "Lunch");
    const dinner = foodList.filter((food) => food.category === "Dinner");
    const refreshment = foodList.filter(
      (food) => food.category === "Refreshment",
    );

    setListCategory({
      breakFast: breakFast,
      lunch: lunch,
      dinner: dinner,
      refreshment: refreshment,
    });
  };

  const fetchHotelDetails = async () => {
    const hotel = await guestControl.getHotelByUser(userId);
    setHotelDetails(hotel);
  };

  const fetchGuestDetails = async (mobile, roomNumber) => {
    const guest = await guestControl.getGuestDetailsByUser(
      mobile,
      roomNumber,
      userId,
    );
    setGuestDetails(guest);
    return guest;
  };

  const fetchGetOrderDetails = async (guestId) => {
    const orderList = await guestControl.getGuestOrdersList(guestId, userId);
    setGuestOrderList(orderList);
  };

  const handleGuestReport = async (repoterRoom, reporterName, report) => {
    const res = await guestControl.addGuestReport(
      repoterRoom,
      reporterName,
      report,
    );
    setShowReportModal(false);
  };

  useEffect(() => {
    if (!userId) return;

    fetchGetFoods();
    fetchHotelDetails();
  }, [userId]);

  const getActiveFoods = (activeCategory) => {
    switch (activeCategory) {
      case "BreakFast":
        return listCategory.breakFast;
      case "Lunch":
        return listCategory.lunch;
      case "Dinner":
        return listCategory.dinner;
      case "Refreshment":
        return listCategory.refreshment;
      default:
    }
    return [];
  };

  const [showAddBTN, setShowAddBTN] = useState(false);
  const [showAlertmentModal, setShowAlertmentModal] = useState(false);
  const [showGuestVerify, setShowGuestVerify] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [guestVerification, setGuestVerification] = useState(false);
  const [navigateCartPage, setNavigateCartage] = useState(false);
  const [navigateOrderListPage, setNavigateOrderListPage] = useState(false);

  const handleAddBTN = (food) => {
    if (selectRoom === 0) {
      setShowAddBTN(true);
      setTimeout(() => {
        setShowAddBTN(false);
      }, 3000);
    } else {
      addToCart(food);
    }
  };

  const addToCart = (food) => {
    setCart((prev) => ({
      ...prev,
      [food._id]: {
        foodId: food._id,
        title: food.title,
        price: food.price,
        quantity: 1,
        roomNo: selectRoom,
      },
    }));
  };

  useEffect(() => {
    const total = Object.values(cart).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );
    setTotalAmount(total);
  }, [cart]);

  const increaseQty = (food) => {
    setCart((prev) => {
      if (!prev[food._id]) return prev;

      return {
        ...prev,
        [food._id]: {
          ...prev[food._id],
          quantity: prev[food._id].quantity + 1,
        },
      };
    });
  };

  const decreaseQty = (food) => {
    setCart((prev) => {
      if (!prev[food._id]) return prev;

      const qty = prev[food._id].quantity - 1;

      if (qty <= 0) {
        const updated = { ...prev };
        delete updated[food._id];
        return updated;
      }

      return {
        ...prev,
        [food._id]: { ...prev[food._id], quantity: qty },
      };
    });
  };

  const getQty = (id) => cart[id]?.quantity || 0;

  const cartCount = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0,
  );

  const handleGuestVerify = async (rooms, mobile) => {
    const guest = await fetchGuestDetails(mobile, rooms);

    if (guest && guest.isStay === "Yes") {
      setGuestVerification(true);
      setShowGuestVerify(false);
      setNavigateCartage(true);
    } else {
      alert("Guest not valid or not staying in this room"); // show modal alert
    }
  };

  const handleGotoCartPage = () => {
    if (!guestVerification) {
      setShowGuestVerify(true);
    } else {
      setNavigateCartage(true);
    }
  };

  const handleGuestOrder = async () => {
    if (!guestDetails) return alert("Guest details missing");

    const foodsArray = Object.values(cart).map((item) => ({
      title: item.title,
      price: item.price,
      quantity: item.quantity,
    }));

    const orderPayload = {
      guestId: guestDetails._id,
      mobile: guestDetails.mobile,
      name: guestDetails.name,
      roomNumber: guestDetails.roomNumber,
      amount: totalAmount,
      date: new Date().toLocaleString(),
      foods: foodsArray,
      userId,
    };

    const res = await guestControl.guestOrder(orderPayload);
    console.log(res.message); // modal

    if (res?.success) {
      setCart({});
      setNavigateCartage(false); //
      setNavigateOrderListPage(true);
    }
    fetchGetOrderDetails(guestDetails._id);
  };

  const handlefetchOrderList = async () => {
    if (!guestDetails) return;

    await fetchGetOrderDetails(guestDetails._id);
    setNavigateOrderListPage(true);
  };

  return {
    category,
    hotelDetails,
    selectRoom,
    activeCategory,
    cart,
    cartCount,
    showAddBTN,
    showGuestVerify,
    navigateCartPage,
    totalAmount,
    guestVerification,
    showAlertmentModal,
    guestOrderList,
    navigateOrderListPage,
    showReportModal,
    setShowReportModal,
    setNavigateOrderListPage,
    setShowAlertmentModal,
    setTotalAmount,
    handlefetchOrderList,
    setNavigateCartage,
    setShowGuestVerify,
    setGuestVerification,
    handleAddBTN,
    addToCart,
    increaseQty,
    decreaseQty,
    setCart,
    getQty,
    setActiveCategory,
    setSelectRoom,
    getActiveFoods,
    handleGotoCartPage,
    handleGuestVerify,
    handleGuestOrder,
    handleGuestReport,
  };
};
