import axiosInstance from "./axiosInstance";
import ENDPOINTS from "./endpoints";

// Auth
export const register = (data) => {
  return axiosInstance.post(ENDPOINTS.REGISTER, data);
};

export const verifyOTP = (data) =>
  axiosInstance.post(ENDPOINTS.OTP_VERIFY, data);

export const login = (data) => axiosInstance.post(ENDPOINTS.LOGIN, data);

export const sendResetPasswordLink = (data) =>
  axiosInstance.post(ENDPOINTS.RESET_PASSWORD_LINK, data);

 export const resetPassword = (data) => axiosInstance.post(`${ENDPOINTS.RESET_PASSWORD}/${data.id}/${data.token}`, data.data);


export const changeProfilePic=(data)=>axiosInstance.put(ENDPOINTS.CHANGE_PROFILE_PIC,data)

// Profile
export const getProfile = () => axiosInstance.get(ENDPOINTS.PROFILE);

export const updatePassword = (data) =>
  axiosInstance.post(ENDPOINTS.UPDATE_PASSWORD, data);

// Hotels
export const createHotel = (data) =>
  axiosInstance.post(ENDPOINTS.CREATE_HOTEL, data);

// Booking
export const createBooking = (data) =>
  axiosInstance.post(ENDPOINTS.CREATE_BOOKING, data);

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
