import React, { useEffect, useState } from 'react'
import classes from './Home.module.css'
import MainSlider from '../MainSlider/MainSlider'
import CategorySlider from '../CategorySlider/CategorySlider'
import RecentProducts from '../RecentProducts/RecentProducts'



export default function Home() {
    
  return (
    <>

    <MainSlider/>
    <CategorySlider/>
    <RecentProducts/>

    
    </>
  )
}
