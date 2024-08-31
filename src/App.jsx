import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import LayOut from './components/LayOut/LayOut'
import Cart from './components/Cart/Cart'
import Categories from './components/Categories/Categories'
import Home from './components/Home/Home'
import Login from './components/Login/Login'
import LogOut from './components/LogOut/LogOut'
import Products from './components/Products/Products'
import Register from './components/Register/Register'
import Notfound from './components/Notfound/Notfound'
import Brands from './components/Brands/Brands'
import AuthContextProvider from './Context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import ProductDetails from './components/productDetails/productDetails'
import CartContextProvider from './Context/CartContext'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheckOut from './components/CheckOut/CheckOut'
import MyOrders from './components/MyOrders/MyOrders'
import WishListContextProvider from './Context/WishListContext'
import WishList from './components/WishList/WishList'




function App() {
  

  let router = createBrowserRouter([
        {
          path:'/',
          element:<LayOut/>,
          errorElement:<Notfound/>,
          children:[
            {index:true,element:<ProtectedRoute><Home/></ProtectedRoute>},
            { path:'/cart', element:<ProtectedRoute><Cart/></ProtectedRoute>},
            {path:'/categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
            {path:'/layout',element:<ProtectedRoute><LayOut/></ProtectedRoute>},
            {path:'/login',element:<Login/>},
            {path:'/logout',element:<ProtectedRoute><LogOut/></ProtectedRoute>},
            {path:'/products',element:<ProtectedRoute><Products/></ProtectedRoute>},
            {path:'/register',element:<Register/>},
            {path:'/wishlist',element:<ProtectedRoute><WishList/></ProtectedRoute>},
            {path:'/product-details/:id/:category',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
            {path:'/brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
            {path:'/checkOut',element:<ProtectedRoute><CheckOut/></ProtectedRoute>},
            {path:'/allorders',element:<ProtectedRoute><MyOrders/></ProtectedRoute>},
            { path: '*', element: <ProtectedRoute><Notfound/></ProtectedRoute> }

          ]

          
        }
  ]);

  return (
    <>
   <AuthContextProvider>
    <CartContextProvider>
      <WishListContextProvider>
      <RouterProvider  router={router}/>
      </WishListContextProvider>
   <ToastContainer />
   </CartContextProvider>

   </AuthContextProvider>

    </>
  )
}

export default App
