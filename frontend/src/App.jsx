import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Error404 from './pages/Error404'
import Wishlist from './pages/Wishlist/Wishlist'
import Cart from './pages/Cart/Cart'
import Login from './pages/User/Login'
import Signup from './pages/User/Signup'
import Account from './pages/User/Account'
import UserDetails from './pages/User/UserDetails'
import Order from './pages/User/Order'
import OrderTracking from './pages/User/OrderTracking'
import Address from './pages/User/Address'
import AccountDetails from './pages/User/AccountDetails'
import Logout from './pages/User/Logout'
import Products from './pages/Products/Products'
import SingleProduct from './pages/Products/SingleProduct'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AllProducts from './pages/admin/AllProducts'
import AddProduct from './pages/admin/AddProduct'
import Category from './pages/admin/Category'
import AddCategory from './pages/admin/AddCategory'
import AdminLogin from './pages/admin/AdminLogin'
import ProtectedRoute from './components/ProtectedRoute'
import Checkout from './pages/User/Checkout'


function App() {

  return (
    <>
     <Routes>
      <Route path='/' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
      <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
      <Route path='/wishlist' element={<ProtectedRoute><Wishlist/></ProtectedRoute>}/>
      <Route path='/checkout/:orderId' element={<ProtectedRoute><Checkout/></ProtectedRoute>}/>

      <Route path='/account' element={<ProtectedRoute><Account/></ProtectedRoute>}>
        <Route index element={<UserDetails/>}/>
        <Route path='order' element={<Order/>}/>
        <Route path='ordertracking' element={<OrderTracking/>}/>
        <Route path='address' element={<Address/>}/>
        <Route path='accountdetails' element={<AccountDetails/>}/>
        <Route path='logout' element={<Logout/>}/>
      </Route>

      <Route path='/singleProduct/:id' element={<SingleProduct/>}/>
      <Route path={'/products'} element={<Products/>}/>
      <Route path={'/products/:catname'} element={<Products/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/login' element={<Login/>}/>

      <Route path='/admin/login' element={<AdminLogin/>}/>

      <Route path='/admin' element={<Layout/>}>
        <Route index element={<Dashboard/>}/>
        <Route path='allproducts' element={<AllProducts/>}/>
        <Route path='addproduct' element={<AddProduct/>}/>
        <Route path='allcategory' element={<Category/>}/>
        <Route path='addcategory' element={<AddCategory/>}/>
      </Route>



      <Route path='*' element={<Error404/>}/>
     </Routes>
    </>
  )
}

export default App
