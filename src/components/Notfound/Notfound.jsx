import React, { useEffect, useState } from 'react'
import classes from './Notfound.module.css'



export default function Notfound() {
    
  return (
    <>

    <div className="error bg-black flex justify-center items-center h-screen">
      <h1 className='text-white'>Error : not found path </h1>
    </div>
    </>
  )
}
