import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Product from './components/Products/Product'
import { Navbar } from './components/Navbar/Navbar'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductDetail from './components/ProductDetail/ProductDetail'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import Cart from './components/Cart/Cart'


const App: React.FC = () => {
  return (
    // <Router>
    //   <ScrollToTop /> {/* Đảm bảo trang luôn cuộn lên đầu khi chuyển route */}
    //   <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
    //     <Navbar />
    //     <Routes>
    //       {/* Trang Home hiển thị Hero và Product */}
    //       <Route
    //         path=""
    //         element={
    //           <>
    //             <Hero />
    //             <Product />
    //           </>
    //         }
    //       />
    //       {/* Trang ProductDetail, không hiển thị Hero và Product */}
    //       <Route path="/ProductDetail" element={<ProductDetail />} />
    //     </Routes>
    //     <Footer />
    //   </div>
    // </Router>
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar/>
      <Hero/>
      <Product/>
      {/* <Cart /> */}
      <Footer/>
    </div>
  )
};

export default App;
