export const BASE_URL = "https://cloudbnb-hotel-booking-platform.onrender.com/api";

export const IMAGE_BASE_URL = "https://cloudbnb-hotel-booking-platform.onrender.com";
// Helper for image URLs
export const getImageUrl = (imagePath) => {
  if (!imagePath) return "/placeholder.jpg";
  const normalizedPath = imagePath.replace(/\\/g, "/");
  return `${IMAGE_BASE_URL}/${normalizedPath}`;
};

const ENDPOINTS = {
  // Auth
  REGISTER: "/user-register",
  OTP_VERIFY: "/otp-verify",
  LOGIN: "/user-login",
  RESET_PASSWORD_LINK: "/reset-password-link",
  RESET_PASSWORD: `/reset-password`,

  // User Profile
  PROFILE: "/profile",
  UPDATE_PASSWORD: "/update-password",
  CHANGE_PROFILE_PIC: "/change-profilePic",

  // Hotels
  CREATE_HOTEL: "/create-hotel",

  // Bookings
  CREATE_BOOKING: "/booking/create",
  GET_BOOKING: "/booking/get",

  // property images
  GET_PROPERTIES: "/property-list",

  //get single property
  GET_SINGLE_PROPERTY: "/single-property",

  //category filter
  GET_PROPERTIES_BY_CATEGORY: "/categorywise-list",
};

export default ENDPOINTS;
