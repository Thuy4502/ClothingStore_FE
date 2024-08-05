import './App.css'
import Cart from './customer/components/Cart/Cart'
import Checkout from './customer/components/Checkout/Checkout'
import Footer from './customer/components/Footer/Footer'
import Navigation from './customer/components/Navigation/Navigation'
import Product from './customer/components/Product/Product'
import ProductQuickView from './customer/components/Product/ProductQuickView'
import ProductDetais from './customer/components/ProductDetails/ProductDetais'
import HomePage from './customer/pages/HomePage/HomePage'
import Order from './customer/components/Order/Order'
import OrderDetails from './customer/components/Order/OrderDetails'
import { Route, Routes } from 'react-router-dom'
import CustomerRouters from './Routers/CustomerRouters'
import AdminRouters from './Routers/AdminRouters'



function App() {
  return (
    (
      <div className=''>
        <Routes>
          <Route path='/*' element={<CustomerRouters/>}></Route>
          <Route path='/admin/*' element={<AdminRouters/>}></Route>

        </Routes>
        
      </div>
    )
  )
}

export default App
