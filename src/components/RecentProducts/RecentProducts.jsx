import React, { useEffect, useState } from 'react'
import classes from './RecentProducts.module.css'
import axios from 'axios'
import Product from '../product/product';



export default function RecentProducts() {
  const [RecentProducts, setRecentProducts] = useState([]);
  const [Error, setError] = useState(null);
  const [Loader, setLoader] = useState(false);


  async function getRecentProducts() {
    setLoader(true);
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      setRecentProducts(data.data)
      setError(null)
      console.log(data);


    } catch (error) {
      setError(error.response.data.message)
      setRecentProducts([]);
      console.log(error);

    }
    finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getRecentProducts();
  }, [])

  return (
    <>
      <div className="container">

        {Loader ? <div className='w-full h-screen flex justify-center items-center'><i class="fa-solid fa-spinner fa-spin text-7xl text-blue-800"></i></div> :
          Error ? <div className='bg-red-200 p-3 border-red-400 border-2 rounded-lg text-center'>{Error}</div> : <>
            <div className="row">
              {RecentProducts.map((product) =>
              <Product product={product}/> )}
            </div>
          </>}
      </div>
    </>
  )
}
