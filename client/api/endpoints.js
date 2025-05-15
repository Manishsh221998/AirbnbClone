const BASE_URL = "http://localhost:6001/api";

export const IMAGE_BASE_URL = "http://localhost:6001";

export const ENDPOINTS = {
  // Auth
  REGISTER: "/user-register",
  OTP_VERIFY: "/otp-verify",
  LOGIN: "/user-login",
  RESET_PASSWORD_LINK: "/reset-password-link",
  RESET_PASSWORD:  "/reset-password",

  // User Profile
  PROFILE: "/profile",
  UPDATE_PASSWORD: "/update-password",

  // Hotels
  CREATE_HOTEL: "/create-hotel",

  // Bookings
  CREATE_BOOKING: "/booking",

  // PROPERTY-images
  GET_PROPERTIES: "/property-list",
};

export default BASE_URL;
