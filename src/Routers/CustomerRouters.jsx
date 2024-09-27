import React from 'react'
import {Route, Routes } from 'react-router-dom'
import HomePage from '../customer/pages/HomePage/HomePage'
import Navigation from '../customer/components/Navigation/Navigation'
import Footer from '../customer/components/Footer/Footer'
import ProductDetails from '../customer/components/ProductDetails/ProductDetais'
import Cart from '../customer/components/Cart/Cart'
import Product from '../customer/components/Product/Product'
import Checkout from '../customer/components/Checkout/Checkout'
import Order from '../customer/components/Order/Order'
import OrderDetails from '../customer/components/Order/OrderDetails'
import ImageUpload from '../Admin/Component/ImageUpload'
import UserProfileCard from '../customer/components/Profile/UserProfile'
import ProductQuickView from '../customer/components/Product/ProductQuickView'
import BuyNow from '../customer/components/Checkout/BuyNow'
import PrivateRoute from './PrivateRoute'
import AdminRouters from './AdminRouters'
import Admin from '../Admin/Admin'
import Error from '../customer/Auth/Error'

const CustomerRouters = () => {
    
    return (
        <div>
            <div>
                <Navigation/>
            </div>
            <Routes>
                <Route path='/login' element={<HomePage/>}></Route>
                <Route path='/register' element={<HomePage/>}></Route>
                <Route path='/forgot-password' element={<HomePage/>}></Route>
                <Route path='/confirm-otp' element={<HomePage/>}></Route>
                <Route path='/' element={<HomePage/>}></Route> 
                <Route path='/product/:productId' element={<ProductDetails/>}></Route>   
                <Route path='/:lavelOne/:lavelTwo/:lavelThre' element={<Product/>}></Route>
                <Route path='/products/getAll' element={<Product/>}></Route>
                <Route path='/cart' element={<PrivateRoute element={<Cart />} />} />
                <Route path='/checkout' element={<PrivateRoute element={<Checkout />} />} />
                <Route path='/account/order' element={<PrivateRoute element={<Order />} />} />
                <Route path='/account/order/:orderId' element={<PrivateRoute element={<OrderDetails />} />} />
                <Route path='/account/profile' element={<PrivateRoute element={<UserProfileCard />} />} />
                <Route path='/account/buy-now' element={<PrivateRoute element={<BuyNow />} />} />
                <Route path='/error' element={<Error />} /> 

            </Routes>
            <div>
                <Footer/>
            </div>
        </div>
      )
}

export default CustomerRouters