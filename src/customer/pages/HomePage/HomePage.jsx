import React, { useState } from 'react'
import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCard from '../../components/HomeSectionCard/HomeSectionCard'
import LoginPage from '../Auth/LoginPage'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import { products1 } from '../../../Data/products1';

const HomePage = () => {
  return (
    <div>
      <MainCarousel />
      <div className='flex flex-col space-y-1 py-20'>
        <HomeSectionCarousel category="1" sectionName="T-shirt" />
        {/* <HomeSectionCarousel category="7" sectionName="Shirt" /> */}

      </div>
    </div>
  )
}

export default HomePage