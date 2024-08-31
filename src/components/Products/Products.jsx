import React, { useEffect, useState } from 'react'
import classes from './Products.module.css'
import axios from 'axios'
import Product from '../product/product';



export default function Products() {

  const [allProducts, setAllProducts] = useState(null)
  const [Error, setError] = useState(false);
  const [Loader, setLoader] = useState(false);

    
 async function getAllProducts(){
  setLoader(true);
  try {
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
    console.log(data.data);
    setError(null)
    setLoader(false)
    setAllProducts(data.data)
    
    
  } catch (error) {
    setError(true)
    setRecentProducts([]);
    console.log(error);
    
  }
  finally {
    setLoader(false);
  }
 }

 useEffect(()=>{
  

  getAllProducts();

 },[])

  return (
    <>
   <div className="container">

{Loader ? <div className='w-full h-screen flex justify-center items-center'><i class="fa-solid fa-spinner fa-spin text-7xl text-blue-800"></i></div> :
  Error ? <div className='bg-red-200 p-3 border-red-400 border-2 rounded-lg text-center'>Something go wrong dear </div> : <>
    <div className="row">
      {allProducts?.map((product) =>
      <Product product={product}/> )}
    </div>
  </>}
</div>
    
    </>
  )
}
