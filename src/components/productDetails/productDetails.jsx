import React, { useContext, useEffect, useState } from 'react'
import classes from './ProductDetails.module.css'
import axios from 'axios'
import Product from '../product/product';
import { useParams } from 'react-router-dom';
import RelatedProducts from '../RelatedProducts/RelatedProducts';
import Slider from "react-slick";
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify'



export default function productDetails() {
  const [ProductDetails, setProductDetails] = useState({});
  const [Error, setError] = useState(null);
  const [Loader, setLoader] = useState(false);
  let { id } = useParams();



 let{addToCart}= useContext(CartContext);

  async function addProductToCart(productId){

    let response = await addToCart(productId);
    if(response.status===`success`){
      toast.info(response.message,{
        position:"top-left",
        theme:'dark',
        autoClose: 5000,
      });
    }
     else{
      toast.error("something bad just happen",{
        position:"top-right",
        theme:'dark',
        autoClose: 5000,
       });
    }
  }  


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  


  async function getProductDetails(id) {
    setLoader(true);
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data)
      setError(null)
      console.log(data.data);


    } catch (error) {
      setError(error.response.data.message)
      setProductDetails({});
      

    }
    finally {
      setLoader(false);
    }
  }

  useEffect(() => {
    getProductDetails(id);
  }, [id])

  return (
    <>
      <div className="container">

        {Loader ? <div className='w-full h-screen flex justify-center items-center'><i className="fa-solid fa-spinner fa-spin text-7xl text-blue-800"></i></div> :
          Error ? <div className='bg-red-200 p-3 border-red-400 border-2 rounded-lg text-center'>{Error}</div> : <>
            <div className="row">
              <div className="w-full md:w-1/3">
                <Slider {...settings}>
                  {ProductDetails?.images?.map((src,index)=>(<img key={index} src={src} alt={ProductDetails.title}/>))} 

                </Slider>
              </div>
              <div className="w-full md:w-2/3">
                <div className="productInfo mx-28 ">
                  <h1 className='text-4xl flex'><span className='font-bold'>Brand Name</span> : <span className='text-blue-600 font-bold' >{ProductDetails?.brand?.name}</span></h1>
                  <h1 className='text-gray-700 my-2 text-xl' > {ProductDetails?.description}</h1>
                  <h4 className='font-semibold text-slate-700'>{ProductDetails?.title}</h4>
                  <div className="collection text-slate-700 font-normal">

                    <div className='flex  items-center mt-2'>
                      <span className=' me-4'>{ProductDetails?.price} EGP</span>

                      <i className='fas fa-star text-yellow-400'></i>
                    </div>
                    <span className=' me-4'>Price After Discount : {ProductDetails?.priceAfterDiscount} EGP </span>
                    <h1 className=''>Available /  {ProductDetails?.quantity} Piece</h1>
                    <h1 className=''>Sold /  {ProductDetails?.sold} Piece</h1>

                  </div>

                  <button onClick={()=>addProductToCart(ProductDetails.id)} className='bg-blue-600 text-white p-2 rounded-md w-full mt-24 '>Add to cart</button>
                </div>
              </div>
            </div>
          </>}

        <RelatedProducts />
      </div>


    </>
  )
}

