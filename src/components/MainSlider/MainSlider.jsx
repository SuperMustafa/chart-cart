import mainImg from '../../assets/images/choclate.jpg'
import slidetwo from '../../assets/images/bekarey.jpg'
import slidethree from '../../assets/images/HomeWindow.jpg'
import slidefour from '../../assets/images/green.webp'
import slidefive from '../../assets/images/mirrirs.jpg'
import staticOne from '../../assets/images/makeup.avif'
import staticTwo from '../../assets/images/screen2.webp'
import elctronics from'../../assets/images/ICT-electronics.jpg'
import Slider from "react-slick";
import { useEffect, useState } from 'react'




export default function MainSlider() {
 
  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    autoplaySpeed:5000,
    arrows:false,
  };



  return <>
    <div className="row">
      <div className="w-3/4">
      <Slider {...settings}>
      <img className='w-full  h-[400px]' src={mainImg}/>
      <img className='w-full  h-[400px]' src={slidetwo}/>
      <img className='w-full  h-[400px]' src={slidethree}/>
      <img className='w-full  h-[400px]' src={slidefour}/>
      <img className='w-full  h-[400px]' src={slidefive}/>
      <img className='w-full  h-[400px]' src={elctronics}/>
        </Slider>
      
      </div>
      <div className="w-1/4">
    
        <img className='w-full h-[200px] ' src={staticOne} />
        <img className='w-full  h-[200px]' src={staticTwo} />
      </div>


    </div>

  </>
}