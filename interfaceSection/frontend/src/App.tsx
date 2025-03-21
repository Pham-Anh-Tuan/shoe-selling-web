import Footer from './components/Footer/Footer'
import Hero from './components/Hero/Hero'
import Product from './components/Products/Product'
import {Navbar} from './components/Navbar/Navbar'


function App() {
  return (
    <div className="bg-white dark:bg-gray-900 dark:text-white duration-200">
      <Navbar/>
      <Hero/>
      <Product/>
      <Footer/>
    </div>
  )
}

export default App
