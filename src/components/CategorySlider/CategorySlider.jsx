import React, { useEffect, useState } from 'react'
import classes from './CategorySlider.module.css'
import axios from 'axios';
import Slider from "react-slick";

export default function CategorySlider() {
    
 
    const settings = {
      dots: true,
      infinite: true,
      speed: 1500,
      slidesToShow: 8,
      slidesToScroll: 2,
      autoplay:true,
      autoplaySpeed:5000,
    };
  
  
  
    let [categories,setCategories]=useState([]);
  
  
  
    async function getCategories(){
      let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
     
      
      setCategories(data.data);
  
      
  
  
    }
  
    useEffect(()=>{
    getCategories();
    },[])
  
    return (<>
    <div className="container">
    <div className="slider my-6">
    <Slider {...settings}>
   
   {categories.map((category)=> <div key={category._id}>
       <img className='h-52 w-full object-cover' src={category.image} alt="" />
       <h1 className='text-slate-700 font-bold'>{category.name}</h1>
  
     </div>)}
  
   </Slider>
  
    </div>
    </div>
   
   
      
  
    </>
    )
}
