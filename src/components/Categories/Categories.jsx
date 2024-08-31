import React, { useEffect, useState } from 'react'
import classes from './Categories.module.css'
import axios from 'axios';
import Slider from "react-slick";


export default function Categories() {
    const [Categories, setCategories] = useState(null)
    const [Loader, setLoader] = useState(false);
    const [Error, setError] = useState(false)

    async function getAllCategories(){
      setLoader(true)
      try {
      
      let{data}=await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      setCategories(data.data)
      console.log(data.data);
      } catch (error) {
        setError(true)
        console.log(error);
        
      }
      finally {
        setLoader(false);
      }
      

    }

    
useEffect(()=>{

getAllCategories();

},[])

  return <>
   

   <div className="container">
   {Loader ? <div className='w-full h-screen flex justify-center items-center'><i class="fa-solid fa-spinner fa-spin text-7xl text-blue-800"></i></div>:
   Error ? <div className='bg-red-200 p-3 border-red-400 border-2 rounded-lg text-center'><p>SomeThing go wrong dear </p></div>:
   <>
    <div className="row justify-center">
     
        {Categories?.map((category)=>(
          
          <div className='item w-full lg:w-1/3 border-2 rounded-lg mx-5 my-14 px-3 py-2   cursor-pointer  hover:scale-110 transition-all duration-300 '>
            <img className='w-full object-cover h-72 rounded-lg   ' src={category.image} alt={category.name} />
            <h1 className='text-blue-600  font-semibold text-center p-12  text-3xl' >{category.name}</h1>
        </div>))}
      
    </div>
   
   </>}
   
   </div>
  
    

  </>
}











































































































































































// import React, { useEffect, useState } from 'react'
// import classes from './Categories.module.css'
// import axios from 'axios';
// import Slider from "react-slick";


// export default function Categories() {
    
//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 1500,
//     slidesToShow: 8,
//     slidesToScroll: 2,
//     autoplay:true,
//     autoplaySpeed:5000,
//   };



//   let [categories,setCategories]=useState([]);



//   async function getCategories(){
//     let {data}= await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
   
    
//     setCategories(data.data);

    


//   }

//   useEffect(()=>{
//   getCategories();
//   },[])

//   return <>

//   <div className="slider my-6">
//   <Slider {...settings}>
 
//  {categories.map((category)=> <div key={category._id}>
//      <img className='h-52 w-full object-cover' src={category.image} alt="" />
//      <h1 className='text-slate-700 font-bold'>{category.name}</h1>

//    </div>)}

//  </Slider>

//   </div>
 
    

//   </>
// }
