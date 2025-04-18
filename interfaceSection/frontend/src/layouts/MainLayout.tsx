import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar/Navbar";
import SignIn from "../components/SignInOut/SignIn";
import SignOut from "../components/SignInOut/SignOut";
import ForgotPassword from "../components/SignInOut/ForgotPassword";
import Footer from "../components/Footer/Footer";

interface MainLayoutProps {
    handleSignInPopup: () => void;

    signInPopup: boolean;
    setSignInPopup: (isOpen: boolean) => void
    signOutPopup: boolean;
    setSignOutPopup: (isOpen: boolean) => void
    forgotPWPopup: boolean;
    setForgotPWPopup: (isOpen: boolean) => void

    handleForgotPWPopup: () => void
    handleSignOutPopup: () => void
}

const MainLayout: React.FC<MainLayoutProps> = ({ handleSignInPopup, signInPopup, setSignInPopup, signOutPopup, setSignOutPopup, forgotPWPopup, setForgotPWPopup, handleForgotPWPopup, handleSignOutPopup }) => {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar handleSignInPopup={handleSignInPopup} />
      <Outlet /> {/* Dùng để render nội dung của từng Route */}
      <SignIn signInPopup={signInPopup} setSignInPopup={setSignInPopup} handleSignOutPopup={handleSignOutPopup} handleForgotPWPopup={handleForgotPWPopup} />
      <SignOut signOutPopup={signOutPopup} setSignOutPopup={setSignOutPopup} handleSignInPopup={handleSignInPopup} />
      <ForgotPassword forgotPWPopup={forgotPWPopup} setForgotPWPopup={setForgotPWPopup} />
      <Footer />
    </div>
  );
}

export default MainLayout;
