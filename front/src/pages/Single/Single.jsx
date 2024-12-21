import React, { useEffect, useState } from 'react'
import InfoPanel from '../../components/Info/InfoPanel'
import Navigation from '../../components/Navigation/Navigation'
import Article from '../../components/Article/Article'
import Footer from '../../components/Footer/Footer'
import '../../App.css'
import './Single.css'
import Similar from './Similar'
import './../../components/Daily/Daily.css'
import { useLocation } from 'react-router-dom'
import { axiosInstance } from '../../utils/axiosInstance'
import { ShimmerDiv, ShimmerTitle } from 'shimmer-effects-react';

function Single() {
  const location = useLocation();
  const id = location.state;
  const [ArticleData, setArticleData] = useState(null)
  const [ArticleLoading, setArticleLoading] = useState(true)

  useEffect(() => {
    window.scroll(0,0)
    setArticleLoading(true)
      axiosInstance
        .get(`articles/${id}/`)
        .then((res) => {
          setArticleData(res?.data)
          setArticleLoading(false)
        })
        .catch((err) => {
          console.log(err);
        });
  }, [id])
  return (
    <>
        <InfoPanel />
        <Navigation />
        <div className="container">
          <div className="wrapper">
            <div className='article-wrapper'>
              {
                ArticleLoading ? 

                  <>
                    <ShimmerDiv mode="light" rounded={1} className='daily_main_img_shimmer' />
                    <ShimmerTitle mode="light" line={10} gap={8} /> : 
                  </>
                  :
                  <Article data={ArticleData} />
                
              }
            </div>


            <div className="daily__news__similar">
              {ArticleData && <Similar typear={ArticleData.typear} />}
            </div>
          </div>
        </div>
        <Footer />
    </>
  )
}

export default Single
