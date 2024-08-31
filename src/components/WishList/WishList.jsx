import React, { useContext, useEffect, useState } from 'react'
import classes from './WishList.module.css'
import { WishListContext } from '../../Context/WishListContext'
import imageTest from '../../../src/assets/images/Milk.jfif'
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { Link } from 'react-router-dom'
import { CartContext } from '../../Context/CartContext'
import { toast } from 'react-toastify'




export default function WishList() {

  let { getWishList,removeFromWishList } = useContext(WishListContext);
  let{addToCart}=useContext(CartContext);
  const [wishList, setWishList] = useState(null)
  const [Loading, setLoading] = useState(false)
  const [Error, setError] = useState(false)

  async function gitLoggedUserWishList() {
    setLoading(true);
    let response = await getWishList();
    if (response.status === "success") {
      setWishList(response.data)
      setLoading(false)
    }
    else {
      console.log(response);
      setError(true);
    }



  }
  

  async function deleteFromWishList(productId) {
    // setLoading(true);
    let response=await removeFromWishList(productId);
    if (response.status==='success'){
      // setLoading(false);
      toast.info('Item removed from your wish list ');
    } 
     
    else{
    toast.error('something go wrong')

    }
    }

   
    





  async function addProductToCart(productId){
    setLoading(true);
    let response = await addToCart(productId);
    if(response.status===`success`){
      setLoading(false)
      toast.info(response.message,{
        position:"top-left",
        theme:'dark',
        autoClose: 5000,
      })
    }


    else if(response.message!='success'){
     toast.error("something bad just happen",{
      position:"top-right",
      theme:'dark',
      autoClose: 5000,
     })
    }
  }



  useEffect(() => {
    gitLoggedUserWishList()
  }, [])

  

  return (
    <>
      <div className="container " >
        <div className="main-heading my-10" >
          <h1 className='text-3xl font-semibold text-blue-600'>My Wish List</h1>
        </div>

        <div className="wishList-Box   w-11/12 mx-auto p-10 rounded-xl bg-slate-200">
          {Loading ? <div className='w-full h-screen flex justify-center items-center'><i class="fa-solid fa-spinner fa-spin text-7xl text-blue-800"></i></div> :
            Error ? <div className='bg-red-200 p-3 border-red-400 border-2 rounded-lg text-center'><p>SomeThing go wrong dear </p></div> :
              <>
                <div className="row flex justify-between items-center">
                  {wishList?.map((product) => (
                    <>
                      <div className="left-section flex items-center w-full md:w-1/2 my-5">
                        <div className="itemImage mx-5  ">
                          <img className='w-[200px]' src={product.imageCover} alt="" />

                        </div>
                        <div className="itemInfo text-xs font-thin  md:text-2xl md:font-medium ">
                          <p className='my-3'>{product.title}</p>
                          <h3 className='text-blue-600 my-3'>{product.price} Egp</h3>
                          <div className="delete flex items-center ">
                            <button className='flex text-red-500' onClick={()=>{deleteFromWishList(product.id)}}>
                            <i className='fa-solid fa-trash  mx-1'> </i>
                            <p >remove</p>
                            </button>
                      
                           
                          </div>
                        </div>

                      </div>

                      <div className="right-section  w-full md:w-1/2  text-end" >
                        <Link onClick={()=>{addProductToCart(product.id)}} className='text-black   p-1 md:p-3   rounded-lg w-full md:w-1/3 border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-colors duration-500'>Add to cart </Link>
                      </div>
                    </>
                  ))}

                </div>

              </>
          }

        </div>

      </div>


    </>
  )




}

