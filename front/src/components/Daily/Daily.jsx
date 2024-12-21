import React, { useEffect, useState, useTransition } from 'react'
import './Daily.css'
import CenteralBanner from '../CenteralBanner/CenteralBanner'
import Official from './Official'
import { axiosInstance } from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import DOMPurify from "dompurify";
import HumanReadableDate from '../../utils/HumanReadableDate'
import { useTranslation } from 'react-i18next'
import { ShimmerDiv, ShimmerTitle } from 'shimmer-effects-react';

function Daily() {
    const {t} =useTranslation()
    const navigate = useNavigate()
    const [MainArticle, setMainArticle] = useState([])
    const [FourArticle, setFourArticle] = useState([])
    const [SideBanner, setSideBanner] = useState([])
    const [LoadingMain, setLoadingMain] = useState(true)
    const [LoadingFour, setLoadingFour] = useState(true)
    const [LoadingSideBanner, setLoadingSideBanner] = useState(true)




    function handleClick(id) {
      navigate("/article", { state: id });
    }
    function ShowAll(typear) {
      navigate("/articles", { state: typear });
    }
	function gotolink(params) {
    		window.open(`${params}`, '_blank');
  	}
    const {i18n} = useTranslation()
  useEffect(() => {
    setLoadingMain(true)
      axiosInstance
        .get(`main-article/`)
        .then((res) => {
            setMainArticle(res?.data.results[0])
            setLoadingMain(false)
        })
        .catch((err) => {
          console.log(err);
        });
    
        setLoadingSideBanner(true)
        axiosInstance
        .get(`side-banner/`)
        .then((res) => {
            setSideBanner(res?.data.results[0])
            setLoadingSideBanner(false)
        })
        .catch((err) => {
          console.log(err);
        });


    setLoadingFour(true)
      axiosInstance
        .get(`four-article/`)
        .then((res) => {
            setFourArticle(res?.data.results)
            setLoadingFour(false)
        })
        .catch((err) => {
          console.log(err);
        });
  }, [])
  return (
    <>
    <div className="container">
        <div className="daily__wrapper">
            <div className="daily__content__banner">
                <div className="daily__content">
                    <div className="daily__header">
                        <div className="daily__title">
                            <p>{t('daily')}</p>
                        </div>
                        <div className="daily__all">
                            <a onClick={() => {ShowAll('news')}}>{t('showall')}</a>
                        </div>
                    </div>
                    <div className="daily__box">
                        <div className="daily__main">
                            {
                                LoadingMain ? 
                                    <ShimmerDiv mode="light" rounded={1} className='daily_main_img_shimmer' />

                                :
                                    MainArticle.images_for_web && <div className="main__image"  style={{ backgroundImage: `url(${MainArticle?.images_for_web[0]?.src})` }}></div>
                            }
                            {
                                LoadingMain ? 
                                    <ShimmerTitle mode="light" line={10} gap={8} /> : 
                                    <>
                                    <div className="main__tag__date">
                                            <a href='#'>{
                                                i18n.language === 'ru'?
                                                    MainArticle?.category?.name_ru:
                                                i18n.language === 'tm'?
                                                MainArticle?.category?.name_tm:
                                                i18n.language === 'en'?
                                                MainArticle?.category?.name_en:null
                                            }</a>
                                        <span><HumanReadableDate date={MainArticle?.created_at} /></span>
                                    </div>
                                    <div className="main__title">
                                        <p onClick={()=>handleClick(MainArticle?.id)}>{
                                            i18n.language === 'tm'?
                                                MainArticle?.title_tm:
                                            i18n.language === 'ru'?
                                                MainArticle?.title_ru:
                                            i18n.language === 'en'?
                                                MainArticle?.title_en:null
                                    }</p>
                                    </div>
                                    <div className="main__description">
                                        {i18n.language === 'ru' ? (

                                        <p dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(MainArticle?.description_ru),
                                        }}></p>
                                        ):(
                                            null
                                        )}
                                        {i18n.language === 'tm' ? (

                                        <p dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(MainArticle?.description_tm),
                                        }}></p>
                                        ):(
                                            null
                                        )}
                                        {i18n.language === 'en' ? (

                                        <p dangerouslySetInnerHTML={{
                                            __html: DOMPurify.sanitize(MainArticle?.description_en),
                                        }}></p>
                                        ):(
                                            null
                                        )}
                                    </div>
                                    </>

                            }
                        </div>
                        <div className="daily__four__box">
                            {
                                LoadingFour ? 
                                    <>
                                        <div>
                                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer' />
                                            <ShimmerTitle mode="light" line={6} gap={8} />  
                                        </div>
                                        <div>
                                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer' />
                                            <ShimmerTitle mode="light" line={6} gap={8} />  
                                        </div>
                                        <div>
                                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer' />
                                            <ShimmerTitle mode="light" line={6} gap={8} />  
                                        </div>
                                        <div>
                                            <ShimmerDiv mode="light" rounded={1} className='daily_four_img_shimmer' />
                                            <ShimmerTitle mode="light" line={6} gap={8} />  
                                        </div>
                                    </>:

                                    FourArticle?.map((item, index)=> {return (
                                        <div className="daily__one__box" key={index}>
                                            <div className="four__box__image" style={{ backgroundImage: `url(${item?.images_for_web[0].src})` }}></div>
                                            <div className="four__box__tag__date">
                                                <a href='#'>{
                                                    i18n.language === 'tm'?
                                                        item?.category?.name_tm:
                                                    i18n.language === 'ru'?
                                                        item?.category?.name_ru:
                                                    i18n.language === 'en'?
                                                        item?.category?.name_en:null
                                                }</a>
                                                <span><HumanReadableDate date={item?.created_at} /></span>
                                            </div>
                                            <div className="four__box__description">
                                                <p onClick={()=>handleClick(item.id)}
                                                      dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
                                                        i18n.language ==='tm'? 
                                                        item.title_tm:
                                                        i18n.language ==='ru'? 
                                                        item.title_ru:
                                                        i18n.language ==='en'? 
                                                        item.title_en:null
                                                        ),}}
                                                    >
                                                </p>
                                            </div>
                                        </div>
                                    )})                                

                            }
                         </div>
                    </div>
                </div>
                <CenteralBanner />
            </div>
            <div className="daily__banner__news">
                <Official />
                        {
                            LoadingSideBanner ? 
                            <ShimmerDiv mode="light" rounded={1} className='daily_main_img_shimmer' />:
                            <div className="daily__news__bottom__banner">
                                {SideBanner.images_for_web && <div  onClick={()=>{gotolink(SideBanner.button_link)}}  className="daily__news__bottom__banner__img" style={{ backgroundImage: `url(${SideBanner.images_for_web[0].src})` }}></div> }
                            </div>
                        }
            </div>
            
        </div>
    </div>
    </>
  )
}

export default Daily
