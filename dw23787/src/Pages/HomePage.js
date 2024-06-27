import React from 'react'
import Counters from '../Components/HomeComponents/Counters'
import HeroSection from '../Components/HomeComponents/HeroSection'

function HomePage() {
  return (
    <div>
      <HeroSection></HeroSection>
      <div className='container' style={{ zIndex: '10', position: 'relative', marginTop: '-50px', backgroundColor: 'white', borderRadius: '15px' }}>
        <Counters></Counters>
        <div className='row'>
          <div className='col-12 d-flex justify-content-center'>
            <hr className='w-75'></hr>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage