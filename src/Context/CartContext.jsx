import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";




export let CartContext = createContext();



export default function CartContextProvider({children}){
   
  let{userToken}= useContext(AuthContext);
  const [CartItemsCount, setCartItemsCount] = useState(0);
  const [CartData, setCartData] = useState(null);
  let [cartId,setCartId]=useState(null)
  const [userId, setuserId] = useState(null)


  let headers={
    token:userToken,
  }

  let CartEndPoint=`https://ecommerce.routemisr.com/api/v1/cart`


  async function getCart(){
    try {
    let {data}=  await axios.get(CartEndPoint,{headers});
    setCartItemsCount(data.numOfCartItems);
    setCartData(data.data)
    setCartId(data.data._id)
    setuserId(data.data.cartOwner);
   
    
      return data
      
    } catch (error) {
      console.log(error);
      
    }
   
   }


   async function addToCart(productId){
    try {
     let{data}=await axios.post(CartEndPoint,{productId},{headers})
     setCartItemsCount(data.numOfCartItems)
     setCartData(data.data)
     setCartId(data.data._id)
    setuserId(data.data.cartOwner);

        console.log(data);
        return data;
        
    } catch (error) {
        console.log(error);
          
    }
   }

   async function removeFromCart(productId){


    try {
     let{data} = await axios.delete(`${CartEndPoint}/${productId}`,{headers})
     setCartItemsCount(data.numOfCartItems)
     setCartData(data.data)
     setCartId(data.data._id)
    setuserId(data.data.cartOwner);

        console.log(data);
        return data;
        
    } catch (error) {
        return error.response.data.message;
          
    }
   }
   async function updateProductQty(productId,count){


    try {
     let{data} = await axios.put(`${CartEndPoint}/${productId}`,{count},{headers})
     setCartItemsCount(data.numOfCartItems)
     setCartData(data.data)
     setCartId(data.data._id)
    setuserId(data.data.cartOwner);

        console.log(data);
        return data;
        
    } catch (error) {
        return error.response.data.message;
          
    }
   }

   async function payMent(url,shippingAddress){
    try {
      let{data} = await axios.post(url,{shippingAddress},{headers});
      return data;
      

    } catch (error) {
      return error.response.data.message
     
      
    }
   
   }



   
  useEffect(()=>{
        
    userToken && getCart();

    },[userToken]);





   
   return (
   <>
   <CartContext.Provider value={{addToCart,CartData, getCart,CartItemsCount,removeFromCart,updateProductQty,payMent,cartId,userId}}>
    {children}
    </CartContext.Provider> 
    </>)
}