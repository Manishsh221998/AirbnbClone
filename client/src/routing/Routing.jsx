import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AirbnbHeader from "../layout/header/Header";
import ModalController from "../components/auth/ModalController";
import AirbnbFooter from "../layout/footer/Footer";

import UserProfile from "../components/userProfile/UserProfile";
// import Error from "../components/error/Error";
import { SingleProperty } from "../components/cards/SingleProperty";
import ResetPasswordModal from "../components/auth/ResetPassword";
import PropertyList from "../components/cards/PropertyList";

const Routing = () => {
  return (
    <Router>
      <AirbnbHeader />

      <Routes>
        <Route path="/" element={<PropertyList />} />
        <Route path="/properties" element={<PropertyList />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/property/:id" element={<SingleProperty />} />
        <Route
          path="/account/reset-password-link/:id/:token"
          element={<ResetPasswordModal />}
        />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>

      <ModalController />
      <AirbnbFooter />
    </Router>
  );
};

export default Routing;
