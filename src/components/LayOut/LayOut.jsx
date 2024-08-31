import React, { useEffect, useState } from 'react'
import classes from './LayOut.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet } from 'react-router-dom'



export default function LayOut() {
    
  return (
    <>
   <Navbar/>
  
   <Outlet/>
  
 
    <Footer/>
    </>
  )
}
