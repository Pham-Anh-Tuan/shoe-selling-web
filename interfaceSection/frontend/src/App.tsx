import Hero from './components/Hero/Hero'
import Product from './components/Products/Products'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"
import ProductDetail from './components/ProductDetail/ProductDetail'
import Cart from './components/Cart/Cart'
import { useState } from 'react'
import DeliveryInfor from './components/Payment/DeliveryInfor'
import NeedSignIn from './components/SignInOut/NeedSignIn'
import Orders from './components/Orders/Orders'
import OrderDetail from './components/OrderDetail/OrderDetail'
import MainLayout from './components/MainLayout/MainLayout'
import ProductList from './components/Admin/ProductManager/ProductList'
import ProductHelp from './components/Admin/ProductManager/ProductHelp'
import OrderList from './components/Admin/OrderManager/OrderList'
import Chart from './components/Admin/Charts/Chart'
import AdminLayout from './components/Admin/AdminLayout/AdminLayout'
import AccountList from './components/Admin/AccountManager/AccountList'



const App: React.FC = () => {
  const [signInPopup, setSignInPopup] = useState(false);
  const handleSignInPopup = () => {
    setSignInPopup(!signInPopup);
  };

  const [signOutPopup, setSignOutPopup] = useState(false);
  const handleSignOutPopup = () => {
    setSignOutPopup(!signOutPopup);
  };

  const [forgotPWPopup, setForgotPWPopup] = useState(false);
  const handleForgotPWPopup = () => {
    setForgotPWPopup(!forgotPWPopup);
  };

  const [needSignInPopup, setNeedSignInPopup] = useState(false);
  const handleNeedSignIn = () => {
    console.log('asdsadasd');
    setNeedSignInPopup(!needSignInPopup);
  };

  // return (
  //   <Router>
  //     <ScrollToTop />
  //     <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
  //       <Navbar handleSignInPopup={handleSignInPopup} />
  //       <Routes>
  //         <Route
  //           path=""
  //           element={
  //             <>
  //               <Hero />
  //               <Product />
  //             </>
  //           }
  //         />
  //         <Route path="/ProductDetail" element={<ProductDetail />} />
  //         <Route
  //           path="/Cart"
  //           element={
  //             <>
  //               <Cart handleNeedSignIn={handleNeedSignIn} />
  //               <NeedSignIn needSignInPopup={needSignInPopup} setNeedSignInPopup={setNeedSignInPopup} handleSignInPopup={handleSignInPopup} />
  //             </>
  //           }
  //         />
  //         <Route path="/DeliveryInformation" element={<DeliveryInfor />} />
  //         <Route path="/Orders" element={<Orders />} />
  //         <Route path="/OrderDetail" element={<OrderDetail />} />
  //         <Route path="/AdminDashboard" element={<AdminDashboard />} />
  //       </Routes>
  //       <SignIn signInPopup={signInPopup} setSignInPopup={setSignInPopup} handleSignOutPopup={handleSignOutPopup} handleForgotPWPopup={handleForgotPWPopup} />
  //       <SignOut signOutPopup={signOutPopup} setSignOutPopup={setSignOutPopup} handleSignInPopup={handleSignInPopup} />
  //       <ForgotPassword forgotPWPopup={forgotPWPopup} setForgotPWPopup={setForgotPWPopup} />
  //       <Footer/>
  //     </div>
  //   </Router>
  // )

  return (
    <Router>
      <Routes>
        {/* Các trang có Navbar & Footer */}
        <Route path="/" element={<MainLayout
          handleSignInPopup={handleSignInPopup}
          signInPopup={signInPopup}
          setSignInPopup={setSignInPopup}
          signOutPopup={signOutPopup}
          setSignOutPopup={setSignOutPopup}
          forgotPWPopup={forgotPWPopup}
          setForgotPWPopup={setForgotPWPopup}
          handleForgotPWPopup={handleForgotPWPopup}
          handleSignOutPopup={handleSignOutPopup}
        />}>
          <Route index element={<>
            <Hero />
            <Product />
          </>} />
          <Route path="ProductDetail" element={<ProductDetail />} />
          <Route path="Cart" element={<>
            <Cart handleNeedSignIn={handleNeedSignIn} />
            <NeedSignIn needSignInPopup={needSignInPopup} setNeedSignInPopup={setNeedSignInPopup} handleSignInPopup={handleSignInPopup} />
          </>} />
          <Route path="DeliveryInformation" element={<DeliveryInfor />} />
          <Route path="Orders" element={<Orders />} />
          <Route path="OrderDetail" element={<OrderDetail />} />
        </Route>

        
        <Route path="Admin/" element={<AdminLayout />}>
          <Route index element={<>
            <Chart />
          </>} />
          <Route path="ProductList" element={<ProductList />} />
          <Route path="OrderList" element={<OrderList />} />
          <Route path="AccountList" element={<AccountList />} />
        </Route>
        
        <Route path="/ProductHelp" element={<ProductHelp />} />

      </Routes>
    </Router>
  );

};

export default App;
