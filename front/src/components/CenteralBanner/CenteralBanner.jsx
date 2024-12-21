import React, { useEffect, useState } from 'react'
import './CenteralBanner.css'
import { axiosInstance } from '../../utils/axiosInstance'
import { ShimmerDiv } from 'shimmer-effects-react';

function CenteralBanner() {
  const [Banner, setBanner ] = useState([]);
  const [LoadingCenterBanner, setLoadingCenterBanner] = useState(true)
  useEffect(() => {
    setLoadingCenterBanner(true)
      axiosInstance
        .get(`main-banner/`)
        .then((res) => {
            setBanner(res?.data.results[0])
            setLoadingCenterBanner(false)
        })
        .catch((err) => {
          console.log(err);
        });
  }, [])
	function gotolink(params) {
    		window.open(`${params}`, '_blank');
  	}
  return (
    <div className='centeral__banner__wrapper'>
        {
          LoadingCenterBanner ?
          <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer' />:
        Banner.images_for_web && 
          <div  onClick={()=>{gotolink(Banner.button_link)}}  className="centeral__banner__img" 
          style={{ backgroundImage: `url(${Banner?.images_for_web[0]?.src})` }}>
            </div>
            
            
            }
    </div>
  )
}

export default CenteralBanner
