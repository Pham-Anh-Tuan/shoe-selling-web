import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from '../layouts/MainLayout';
import Hero from '../components/Hero/Hero';
import Products from '../components/Products/Products';
import ScrollToTop from '../hooks/ScrollToTop';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import Cart from '../components/Cart/Cart';
import NeedSignIn from '../components/SignInOut/NeedSignIn';
import DeliveryInfor from '../components/Payment/DeliveryInfor';
import Orders from '../components/Orders/Orders';
import OrderDetail from '../components/OrderDetail/OrderDetail';
import AdminLayout from '../layouts/AdminLayout';
import Chart from '../components/Admin/Charts/Chart';
import ProductList from '../components/Admin/ProductManager/ProductList';
import OrderList from '../components/Admin/OrderManager/OrderList';
import AccountList from '../components/Admin/AccountManager/AccountList';
import ProductHelp from '../components/Admin/ProductManager/ProductHelp';

const AppRoutes = () => {
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
        setNeedSignInPopup(!needSignInPopup);
    };
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
                        <Products />
                    </>} />
                    <Route path="ProductDetail/:id" element={
                        <>
                            <ScrollToTop />
                            <ProductDetail />
                        </>}
                    />
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
    )
}

export default AppRoutes;