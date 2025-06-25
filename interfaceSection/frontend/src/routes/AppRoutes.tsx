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
import Profile from '../components/Profile/Profile';
import ProfileLayout from '../layouts/ProfileLayout';
import PassChange from '../components/Profile/PassChange';
import FavouredProduct from '../components/Profile/FavouredProduct';
import OrderSuccess from '../components/Payment/OrderSuccess';
import BlogList from '../components/Admin/BlogManager/BlogList';
import Blogs from '../components/Blogs/Blogs';
import BlogDetail from '../components/BlogDetail/BlogDetail';

const AppRoutes = () => {
    const [signInPopup, setSignInPopup] = useState(false);
    const handleSignInPopup = () => {
        setSignInPopup(!signInPopup);
    };

    const [registerPopup, setRegisterPopup] = useState(false);
    const handleRegisterPopup = () => {
        setRegisterPopup(!registerPopup);
    };

    const [forgotPWPopup, setForgotPWPopup] = useState(false);
    const handleForgotPWPopup = () => {
        setForgotPWPopup(!forgotPWPopup);
    };

    const [needSignInPopup, setNeedSignInPopup] = useState(false);
    const handleNeedSignIn = () => {
        setNeedSignInPopup(!needSignInPopup);
    };

    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const hasCartItems = Array.isArray(cart) && cart.length > 0;

    return (
        <Router>
            <Routes>
                {/* Các trang có Navbar & Footer */}
                <Route path="/" element={<MainLayout
                    handleSignInPopup={handleSignInPopup}
                    signInPopup={signInPopup}
                    setSignInPopup={setSignInPopup}
                    registerPopup={registerPopup}
                    setRegisterPopup={setRegisterPopup}
                    forgotPWPopup={forgotPWPopup}
                    setForgotPWPopup={setForgotPWPopup}
                    handleForgotPWPopup={handleForgotPWPopup}
                    handleRegisterPopup={handleRegisterPopup}
                />}>
                    <Route index element={<>
                        <Hero />
                        <Products />
                    </>} />
                    <Route path="giay-nam" element={<Products />} />
                    <Route path="giay-the-thao" element={<Products />} />
                    <Route path="giay-luoi" element={<Products />} />
                    <Route path="giay-boots" element={<Products />} />
                    <Route path="giay-tay-derby" element={<Products />} />
                    <Route path="dep-da-nam" element={<Products />} />
                    <Route path="phu-kien" element={<Products />} />
                    <Route path="tui-cam-tay-nam" element={<Products />} />
                    <Route path="that-lung-nam" element={<Products />} />
                    <Route path="products/" element={<Products />} />
                    
                    <Route path="productDetail/:id" element={
                        <>
                            <ScrollToTop />
                            <ProductDetail />
                        </>}
                    />
                    <Route path="cart" element={<>
                        <Cart handleNeedSignIn={handleNeedSignIn} />
                        <NeedSignIn needSignInPopup={needSignInPopup} setNeedSignInPopup={setNeedSignInPopup} handleSignInPopup={handleSignInPopup} />
                    </>} />

                    {hasCartItems && (
                        <Route path="deliveryInformation" element={<DeliveryInfor />} />
                    )}

                    <Route path="blogs" element={<Blogs />} />
                    <Route path="blogDetail/:id" element={
                        <>
                            <ScrollToTop />
                            <BlogDetail />
                        </>}
                    />

                    <Route path="orderSuccess" element={<OrderSuccess />} />

                    <Route path="orderDetail" element={<OrderDetail />} />

                    {localStorage.getItem("email") && (
                        <Route path="" element={<ProfileLayout />}>
                            <Route path="profile" index element={<Profile />} />
                            <Route path="password" element={<PassChange />} />
                            <Route path="orders" element={<Orders />} />
                            <Route path="product-favorite" element={<FavouredProduct />} />
                        </Route>
                    )}
                </Route>

                {(
                    localStorage.getItem("role") === "1" ||
                    localStorage.getItem("role") === "3"
                ) && (
                        <Route path="admin/" element={<AdminLayout />}>
                            <Route index element={<>
                                <Chart />
                            </>} />
                            <Route path="productList" element={<ProductList />} />
                            <Route path="orderList" element={<OrderList />} />
                            <Route path="accountList" element={<AccountList />} />
                            <Route path="blogList" element={<BlogList />} />
                        </Route>
                    )}

                {/* <Route path="/blogAdd" element={<BlogAdd />} /> */}
            </Routes>
        </Router>
    )
}

export default AppRoutes;