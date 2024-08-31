import React, { useContext, useEffect, useState } from 'react'
import classes from './login.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup from 'yup';
import '../../../node_modules/@fortawesome/fontawesome-free/css/all.min.css'
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';



export default function Login() {

  const [apiError, setApiError] = useState('');
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();
  let {setUserToken,userToken}= useContext(AuthContext);



  async function handelLogin(values) {
    setLoading(true)
    try {

      let {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      console.log(data);
      if(data.message==='success'){
        setUserToken(data.token);
        localStorage.setItem('userToken',data.token);
        navigate('/')
      }
      setLoading(false)

    } catch (error) {
      console.log(error);
      setApiError(error.response.data.message)
      setLoading(false)
    }



  }
  let validationSchema = Yup.object().shape({
    email: Yup.string().email('User Email is invalid').required('User Email is requeried'),
    password: Yup.string().matches(/^[0-9]{4,20}$/, 'invalid password').required('password requeried'),
  })

  let initialValues = {

    email: '',
    password: '',
  }


  let formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handelLogin,
  })
  return (
    <>


      <form onSubmit={formik.handleSubmit} className="max-w-xl mx-auto">
        <div className="heading font-bold text-3xl text-blue-600 my-8">Login</div>

        {apiError ? <div className="Error p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400">{apiError}</div> : null}

     


        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
        </div>
        {formik.errors.email && formik.touched.email ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
          <p>{formik.errors.email}</p>
        </div> : null}

        <div className="relative z-0 w-full mb-5 group">
          <input onChange={formik.handleChange} value={formik.values.password} onBlur={formik.handleBlur} type="password" name="password" id="password" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
          <label htmlFor="password" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
        </div>
        {formik.errors.password && formik.touched.password ? <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100 dark:text-red-400" role="alert">
          <p>{formik.errors.password}</p>
        </div> : null}
<div className='flex items-center '>
<button disabled={!(formik.isValid && formik.dirty)} type="submit" className=" btn  text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{loading ? <i class="fa-solid fa-spinner fa-spin"></i> : 'Submit'}</button>

  <p className='mx-2'>If you haven't signUp go to <NavLink to={'/register'} ><span className='font-bold text-blue-600' >Register Now</span></NavLink></p>

</div>
      </form>





    </>
  )
}
