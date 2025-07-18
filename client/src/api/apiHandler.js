import axios from "axios";
import axiosInstance from "./axiosInstance";
import ENDPOINTS from "./endpoints";
import { IMAGE_BASE_URL } from "../../api/endpoints";

// Auth
export const register = (data) => {
  return axiosInstance.post(ENDPOINTS.REGISTER, data);
};

export const verifyOTP = (data) =>
  axiosInstance.post(ENDPOINTS.OTP_VERIFY, data);

export const login = (data) => axiosInstance.post(ENDPOINTS.LOGIN, data);

export const sendResetPasswordLink = (data) =>
  axiosInstance.post(ENDPOINTS.RESET_PASSWORD_LINK, data);

export const resetPassword = (data) =>
  axiosInstance.post(
    `${ENDPOINTS.RESET_PASSWORD}/${data.id}/${data.token}`,
    data.data
  );

export const changeProfilePic = (data) =>
  axiosInstance.put(ENDPOINTS.CHANGE_PROFILE_PIC, data);

// Profile
export const getProfile = () => axiosInstance.get(ENDPOINTS.PROFILE);

export const updatePassword = (data) =>
  axiosInstance.post(ENDPOINTS.UPDATE_PASSWORD, data);

// Hotels
export const createHotel = (data) =>
  axiosInstance.post(ENDPOINTS.CREATE_HOTEL, data);

// Booking
// export const createBooking = async(data) =>{
//   let res =await axiosInstance.post(ENDPOINTS.CREATE_BOOKING, data)
//   return res ;}
// export const getBooking=()=>
//   axiosInstance.get(ENDPOINTS.GET_BOOKING)
export const getBookings = async () => {
  const { data } = await axios.get(`${IMAGE_BASE_URL}/booked/booking/get`);
  return data;
};
export const createBooking = async (bookingData) => {
  const { data } = await axios.post(
    `${IMAGE_BASE_URL}/booked/booking/create`,
    bookingData
  );
  return data;
};

// Property Listing
export const getProperties = async () => {
  try {
    const response = await axiosInstance.get(ENDPOINTS.GET_PROPERTIES);
    console.log("Fetched properties:", response.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching properties:", error.response || error);
    throw error;
  }
};

// single property view
export const SingleProperty = async (id) => {
  try {
    const response = await axiosInstance.get(
      `${ENDPOINTS.GET_SINGLE_PROPERTY}/${id}`
    );
    console.log("Single property response:", response.data);
    return response.data; // Return the full response data
  } catch (error) {
    console.error("Error fetching single property:", error.response || error);
    throw error;
  }
};

// category filter

// In apiHandler.js
export const getPropertiesByCategory = async (category) => {
  try {
    const response = await axiosInstance.get(
      `${ENDPOINTS.GET_PROPERTIES_BY_CATEGORY}/${category}`
    );
    return response.data.data;
  } catch (error) {
    console.error("Error fetching properties by category:", {
      error: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};
