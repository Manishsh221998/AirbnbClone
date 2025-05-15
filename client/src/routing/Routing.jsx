import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AirbnbHeader from "../layout/header/Header";
import ModalController from "../components/auth/ModalController";
import AirbnbFooter from "../layout/footer/Footer";

import UserProfile from "../components/userProfile/UserProfile";
// import Error from "../components/error/Error";
import PlacesList from "../components/cards/placeList";
import ResetPasswordModal from "../components/auth/ResetPassword";
import PropertyList from "../components/cards/PropertyList";

const Routing = () => {
  const token = window.localStorage.getItem("usertoken");
 
  return (
    <Router>
      <AirbnbHeader />

      <Routes>
        <Route path="/profile" element={<UserProfile />} />
        <Route
          path="/account/reset-password-link/:id/:token"
          element={<ResetPasswordModal />}
        />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>

      {/* <PlacesList /> */}
     { <PropertyList/>}
      <ModalController />
      <AirbnbFooter />
    </Router>
  );
};

export default Routing;
