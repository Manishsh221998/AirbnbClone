import axiosInstance from "./axiosInstance";
import ENDPOINTS from "./endpoints";

// Auth
export const register = (data) => {
  console.log("Sending to:", ENDPOINTS.REGISTER); // Should show "/user-register"
  console.log("Payload:", data);
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

// property-images
export const getProperties = () => axiosInstance.get(ENDPOINTS.GET_PROPERTIES);

// single Property view
export const getSingleProperty = (id) =>
  axiosInstance.get(`${ENDPOINTS.GET_SINGLE_PROPERTY}/${id}`);

// Category-wise property fetch
export const getPropertiesByCategory = (category) =>
  axiosInstance.get(ENDPOINTS.GET_CATEGORY_PROPERTIES, {
    params: {
      field: "category",
      value: category,
    },
  });
