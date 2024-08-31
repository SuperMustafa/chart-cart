import React, { useContext, useEffect, useState } from 'react'
import classes from './MyOrders.module.css'
import axios from 'axios';
import { CartContext } from '../../Context/CartContext';



export default function MyOrders() {

  let{userId} = useContext(CartContext);
  const [userOrders, setUserOrders] = useState(null)
    
 async function getOrders(){
  try {

    let{data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`);
    setUserOrders(data);
     console.log(data);
     

    
  } catch (error) {
    console.log(error);
    
  }
 }


 useEffect(()=>{
 userId&& getOrders();
 },[userId])

  return (
    <>
    <div className="container py-40">
    {userOrders?.map((order)=> <h1 key={order.id} >{order.totalOrderPrice}</h1> )}

    </div>

    
    </>
  )
}
