export const BASE_URL = "http://localhost:6001/api";

export const IMAGE_BASE_URL = "http://localhost:6001";
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
  RESET_PASSWORD:`/reset-password`,

  // User Profile
  PROFILE: "/profile",
  UPDATE_PASSWORD: "/update-password",
  CHANGE_PROFILE_PIC:"/change-profilePic",

  // Hotels
  CREATE_HOTEL: "/create-hotel",

  // Bookings
  CREATE_BOOKING: "/booking",

  // property images
  GET_PROPERTIES: "/property-list",
};

export default ENDPOINTS;
