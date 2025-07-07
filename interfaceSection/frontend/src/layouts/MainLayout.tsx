import { Outlet, useSearchParams } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import SignIn from "../components/SignInOut/SignIn";
import ForgotPassword from "../components/SignInOut/ForgotPassword";
import Footer from "../components/Footer/Footer";
import Register from "../components/SignInOut/Register";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { alertError } from "../components/Shared/AlertError";

interface MainLayoutProps {
  handleSignInPopup: () => void;

  signInPopup: boolean;
  setSignInPopup: (isOpen: boolean) => void
  registerPopup: boolean;
  setRegisterPopup: (isOpen: boolean) => void
  forgotPWPopup: boolean;
  setForgotPWPopup: (isOpen: boolean) => void

  handleForgotPWPopup: () => void
  handleRegisterPopup: () => void
}

const MainLayout: React.FC<MainLayoutProps> = ({ handleSignInPopup, signInPopup, setSignInPopup, registerPopup, setRegisterPopup, forgotPWPopup, setForgotPWPopup, handleForgotPWPopup, handleRegisterPopup }) => {
  const [searchParams] = useSearchParams();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error) {
      alertError(error); // hiện thông báo lỗi
    }
  }, [error]);
  
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar handleSignInPopup={handleSignInPopup} />
      <Outlet /> {/* Dùng để render nội dung của từng Route */}
      <SignIn signInPopup={signInPopup} setSignInPopup={setSignInPopup} handleRegisterPopup={handleRegisterPopup} handleForgotPWPopup={handleForgotPWPopup} />
      <Register registerPopup={registerPopup} setRegisterPopup={setRegisterPopup} handleSignInPopup={handleSignInPopup} />
      <ForgotPassword forgotPWPopup={forgotPWPopup} setForgotPWPopup={setForgotPWPopup} />
      <ToastContainer />
      <Footer />
    </div>
  );
}

export default MainLayout;
