import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from './AuthContext'





export let WishListContext = createContext();



export default function WishListContextProvider({children}) {

  let{userToken}= useContext(AuthContext);

  let headers={
    token:userToken,
  }


  async function getWishList(){
    try {
      let{data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{headers})
      console.log(data);
      return data;
      
    } catch (error) {
      console.log(error);
      return error
      
    }
   
  }


  async function addToWishList(productId){
   try {
    let {data}= await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers})
     console.log(data);
     return data
     
   } catch (error) {
    console.log(error);
    return error;

    
   }

  }




  async function removeFromWishList(productId){
   try {
    let {data}= await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist`,{productId},{headers})
     console.log(data);
     
   } catch (error) {
    console.log(error);
    
   }

  }



  
    
  return (
    <>
     
  <WishListContext.Provider value={{addToWishList,getWishList,removeFromWishList}} >
    {children}
  </WishListContext.Provider>
    </>
  )
}
