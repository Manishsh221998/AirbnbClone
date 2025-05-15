import { useLocation, useNavigate, useParams } from "react-router-dom";
import RegisterModal from "./Register";
import LoginModal from "./Login";
import OTPVerifyModal from "./OTPVerify";
import ResetPasswordLinkModal from "./ResetPasswordLink";

const ModalController = () => {
    

  const location = useLocation();
  const navigate = useNavigate();

  const handleClose = () => {
    navigate("/"); // Close modal and return to main page
  };
   
  return (
    <>
      {location.pathname === "/register" && (
        <RegisterModal open={true} onClose={handleClose} />
      )}
      {location.pathname === "/otp-verify" && (
        <OTPVerifyModal open={true} onClose={handleClose} />
      )}
      {location.pathname === "/login" && (
        <LoginModal open={true} onClose={handleClose} />
      )}
      {location.pathname === "/reset-password-link" && (
        <ResetPasswordLinkModal open={true} onClose={handleClose} />
      )}
     
    </>
  );
};

export default ModalController;
