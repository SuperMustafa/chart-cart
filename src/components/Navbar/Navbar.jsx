import React, { useContext, useEffect, useState } from 'react'
import classes from './Navbar.module.css'
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import { CartContext } from '../../Context/CartContext'



export default function Navbar() {


   let{userToken,setUserToken}= useContext(AuthContext);
   let {CartItemsCount}= useContext(CartContext);


   function handelLogOut(){
    localStorage.removeItem('userToken');
    setUserToken(null)

   }

  return (
    <>
    <nav className=' bg-slate-100 text-center fixed-top top-0 left-0 right-0'>
    <div className="container">
     <div className="navbar flex justify-around flex-col items-center lg:flex-row">
      <div className="siteLogo flex">
      <NavLink to={''}>  <i  className="fa-solid fa-cart-shopping nav-icon text-blue-600 text-3xl"></i> </NavLink>
      <p className='text-3xl mx-2'>Fresh Cart</p>
      </div>
      {userToken?<> <div className="siteLinks my-5">
        <ul className=' flex flex-col lg:flex-row '>
         <li className='mx-2'><NavLink to={''}>Home</NavLink></li>
         <li className='mx-2'><NavLink to={'/cart'}>Cart</NavLink></li>
         <li className='mx-2'><NavLink to={'/products'}>Products</NavLink></li>
         <li className='mx-2'><NavLink to={'/categories'}>Categories</NavLink></li>
         <li className='mx-2'><NavLink to={'/brands'}>Brands</NavLink></li>
         <li className='mx-2'><NavLink to={'/wishlist'}>Wish list</NavLink></li>
        </ul>
      </div></>:null}
     
      <div className="siteUserStatus flex items-center">
        {userToken?<>      <NavLink to={'Cart'} > <i className="fa-solid fa-cart-shopping fs-3 text-2xl text-gray-500 hover:text-blue-500 mx-10 relative"> <p className='absolute bottom-6 left-6 text-red-500 text-lg'>{CartItemsCount}</p> </i>
        </NavLink>
        <NavLink onClick={handelLogOut} to={'/login'}><p className='text-xl mx-2 '>LogOut</p></NavLink></>:<>
        <NavLink to={'/login'}><p className='text-xl mx-2 '>Login</p></NavLink>
        <NavLink to={'/register'}><p className='text-xl mx-2 '>Register</p></NavLink>
        </>}
  
       
      </div>
     </div>
    </div>

   </nav> 
   <>
 
</>

    </>
  )
}
