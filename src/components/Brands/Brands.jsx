import React, { useEffect, useState } from 'react'
import classes from './Brands.module.css'
import axios from 'axios';



export default function Brands() {
    //https://ecommerce.routemisr.com/api/v1/brands
   
    const [allBrands, setAllBrands] = useState(null)
  const [Error, setError] = useState(null);
  const [Loader, setLoader] = useState(false);

    
 async function getAllBrands(){
  setLoader(true);
  try {
    let {data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
    console.log(data.data);
    setError(null)
    setAllBrands(data.data)
    
    
  } catch (error) {
    setError(true)
    setAllBrands([]);
    console.log(error);
    
  }
  finally {
    setLoader(false);
  }
 }

 useEffect(()=>{
  

  getAllBrands();

 },[])




  return (
    <>

    <div className="container">
    {Loader ? <div className='w-full h-screen flex justify-center items-center'><i class="fa-solid fa-spinner fa-spin text-7xl text-blue-800"></i></div> :
  Error ? <div className='bg-red-200 p-3 border-red-400 border-2 rounded-lg text-center'><p>SomeThing go wrong dear </p></div>:(

    <div className="row">
    {allBrands?.map((brand)=>(
   
      <div className="w-full md:w-1/4 p-3 cursor-pointer  ">
      <div className="item border-2 rounded-lg hover:scale-110 duration-300">
        <img src={brand.image} alt={brand.name} />
      </div>
    
    </div>
     
    ))}
    

    
  </div>
  )}
     
    </div>

    </>
  )
}
