import React, { useContext } from 'react';
import style from './CheckOut.module.css'
import { useEffect,useState } from 'react'
import { useFormik } from 'formik';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Login from '../Login/Login';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
// import { UserContext } from '../../Context/UserContext';
import { CartContext } from '../../Context/CartContext';
import { toast } from 'react-toastify';






export default function CheckOut() {

  let [apiError, setApiError] = useState('');
  let [Loading, setLoading] = useState(false);
  // let{userLogin,setUserLogin}= useContext(UserContext);
  let{payMent,cartId}=useContext(CartContext);
  let[onLine,setOnLine]=useState(false)

  let formSchema = Yup.object().shape({
    details: Yup.string().min(5, 'minmum length must be 5 char').max(50, 'maxmum length must be 50 char').required('Insert details to simplefy the Process'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'invalid phone number').required('Phone number requeried'),
    city: Yup.string().matches(/^([a-zA-Z\u0080-\u024F]+(?:. |-| |'))*[a-zA-Z\u0080-\u024F]*$/).required('City Name requeried'),
  })

  let navigate = useNavigate();

 async function CheckOutData(formValues) {
    setLoading(true)
    let url= onLine?`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
    :`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    let response = await payMent(url,formValues);
    if(response.status==='success'){
      if(onLine){
        location.href=response.session.url;
      }
      else{
        toast.success('Payment done Successfully')
        setTimeout(() => {
          navigate('/allorders')
  
        }, 5000);
      }
    
      
    }
   
 
  }



  

  let formik = useFormik({
    initialValues: {
    details: "",
    phone: "",
    city: ""
    },
    validationSchema: formSchema,
    onSubmit: CheckOutData


  })

  return <>
    <div className="form max-w-md mx-auto">
      <div className="main-Heading  my-10 text-4xl font-bold text-blue-600">

        <h1>Pay Now</h1>



      </div>

       {apiError?<div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
        {apiError}
      </div>:null }

      <form onSubmit={formik.handleSubmit}>
   



      
        <div className='relative z-0 w-full mb-5 group'>

          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="details" value={formik.values.details} id="userDetails" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="userDetails" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Details</label>

        </div>
        {formik.errors.details && formik.touched.details ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
          <p>{formik.errors.details}</p>
        </div> : null}

        <div className='relative z-0 w-full mb-5 group'>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="tel" name="phone" value={formik.values.phone} id="userephone" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="userephone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone</label>
        </div>
        {formik.errors.phone && formik.touched.phone ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
          <p>{formik.errors.phone}</p>
        </div> : null}


        <div className='relative z-0 w-full mb-5 group'>
          <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="city" value={formik.values.city} id="usercity" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
          <label htmlFor="usercity" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">User City</label>
        </div>
        {formik.errors.city && formik.touched.city ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
          <p>{formik.errors.city}</p>
        </div> : null}





    <div className="paying flex items-center">
    <button type="submit" className="mx-2 text-white bg-blue-600 hover:bg-white hover:text-blue-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
          {onLine?'Pay Online':'Pay cash'}
        </button>
    <div className="checkOnline">
      {}
       <input className='mx-2' type="checkbox" id='check' onChange={()=>setOnLine(!onLine)} />
       <label htmlFor="check">Pay Online</label>
       </div>
         
       
    </div>
      </form>

    </div>


  </>
}

