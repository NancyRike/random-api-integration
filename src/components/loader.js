import React from 'react'
import loaderImg from '../assets/loadingGif.svg';
import './style.css'


const Loader = () => {
  return (
    <div className='loaderWrapper'>
        <img src={loaderImg} />
    </div>
  )
}

export default Loader