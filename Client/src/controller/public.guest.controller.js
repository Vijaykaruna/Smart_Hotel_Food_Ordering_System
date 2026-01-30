import { guestApi } from "../api/axios.js";

export const publicGuestController = (userId) => {
  const getHotelByUser = async () => {
    try {
      const res = await guestApi.get(`/guest/hotel/${userId}`);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getGuestDetailsByUser = async (mobile, roomNumber) => {
    try {
      const res = await guestApi.post(`/guest/guest/${userId}`, {
        mobile,
        roomNumber,
      });

      return res.data.guest;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getFoodsByUser = async () => {
    try {
      const res = await guestApi.get(`/guest/foods/${userId}`);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const guestOrder = async (payload) => {
    try {
      const res = await guestApi.post("/guest/order", payload);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const getGuestOrdersList = async (guestId) => {
    try {
      const res = await guestApi.get(`/guest/order/list/${guestId}`, {
        params: { userId },
      });
      return res.data.data;
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const addGuestReport = async (repoterRoom, reporterName, report) => {
    try {
      const res = await guestApi.post("/guest/addReport", {repoterRoom, reporterName, report});
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getHotelByUser,
    getFoodsByUser,
    guestOrder,
    getGuestDetailsByUser,
    getGuestOrdersList,
    addGuestReport,
  };
};
