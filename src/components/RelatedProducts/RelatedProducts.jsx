import React, { useEffect, useState } from 'react'
import classes from './RelatedProducts.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import Product from '../product/product';



export default function RelatedProducts() {


  const [RelatedProducts, setRelatedProducts] = useState([]);
  const [Error, setError] = useState(null);
  const [Loader, setLoader] = useState(false);
  let { category } = useParams();



  async function getRelatedProducts() {
    setLoader(true);
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
      let sameProducts = data.data.filter((Product) => Product.category.name == category)
      setRelatedProducts(sameProducts)
      setError(null)
      console.log(sameProducts);


    } catch (error) {
      setError(error.response.data.message)
      setRelatedProducts({});
      console.log(error.response.data.message);

    }
    finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getRelatedProducts();
  }, [])


  return <>
  
    <h1 className='text-3xl font-bold text-blue-600 mt-32 '>Related Products</h1>
      {Loader ? <div className='w-full h-screen flex justify-center items-center'><i className="fa-solid fa-spinner fa-spin text-7xl text-blue-800"></i></div> :
        Error ? <div className='bg-red-200 p-3 border-red-400 border-2 rounded-lg text-center'>{Error}</div> : <>
          <div className="row">
            {RelatedProducts?.map((product) =>
              <Product product={product} />)}
          </div>
        </>}
   
  
  </>
}