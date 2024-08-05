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

const CustomerRouters = () => {
    return (
        <div>
            <div>
                <Navigation/>
            </div>
            <Routes>
                <Route path='/login' element={<HomePage/>}></Route>
                <Route path='/register' element={<HomePage/>}></Route>
                <Route path='/' element={<HomePage/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/:lavelOne/:lavelTwo/:lavelThre' element={<Product/>}></Route>
                <Route path='/products/getAll' element={<Product/>}></Route>
                <Route path='/product/:productId' element={<ProductDetails/>}></Route>
                <Route path='/checkout' element={<Checkout/>}></Route>
                <Route path='/account/order' element={<Order/>}></Route>
                <Route path='/account/order/:orderId' element={<OrderDetails/>}></Route>
                <Route path='/test' element={<ImageUpload/>}></Route>


          {/* <Order/> */}
            </Routes>
            <div>
                <Footer/>
            </div>
        </div>
      )
}

export default CustomerRouters