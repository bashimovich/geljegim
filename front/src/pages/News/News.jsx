import React, { useEffect, useState } from 'react'
import InfoPanel from '../../components/Info/InfoPanel'
import Navigation from '../../components/Navigation/Navigation'
import MarqueNews from '../../components/MarqueNews/MarqueNews'
import Official from '../../components/Daily/Official'
import './News.css'
import { axiosInstance } from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import DOMPurify from "dompurify";
import { useTranslation } from 'react-i18next'
import HumanReadableDate from '../../utils/HumanReadableDate'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ShimmerContentBlock } from 'shimmer-effects-react';



function News() {
    const {t, i18n} = useTranslation()
    const [News, setNews ] = useState([]);
    const navigate = useNavigate()
    const [NewsLoading, setNewsLoading ] = useState(true);

    function getNews() {
        setNewsLoading(true)
        axiosInstance
            .get(`all-news`)
            .then((res) => {
                setNews(res.data.results)
                setNewsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleClick(id) {
        navigate('/article/', {state: id}) 
        }
    useEffect(() => {
        window.scroll(0,0)
        getNews()
    }, [])

  return (
    <>
        <InfoPanel />
        <Navigation />
        <MarqueNews />
        <div className='container'>
            <div className="news__content__and__adds">
                <div className="news__asside">
                    <div className="news__results">
                        {
                            NewsLoading?
                            <ShimmerContentBlock mode="light" thumbnailBorder={0} rounded={1} items={5} itemsGap={10} thumbnailHeight={150} thumbnailWidth={250} contentDetailsPosition="start" contentDetailTextLines={5} />:

                            News.map((item) => {return(
                                <>
                                    <div className="result" key={item.id}>
                                        <div className="img__container"  style={{ backgroundImage: `url(${item?.images_for_web[0]?.src})` }}></div>
                                        <div className="content__container">
                                            <h1 onClick={() => handleClick(item.id)} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
                                                i18n.language === 'tm'?
                                                item?.title_tm:
                                                i18n.language === 'ru'?
                                                item?.title_ru:
                                                i18n.language === 'en'?
                                                item?.title_en:null

                                                ),}}></h1>
                                            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
                                                i18n.language === 'tm'?
                                                item?.description_tm:
                                                i18n.language === 'ru'?
                                                item?.description_ru:
                                                i18n.language === 'en'?
                                                item?.description_en:null
                                                ),}}></p>
                                            <p className='views__time'>
                                                <span><HumanReadableDate date={item?.created_at} /></span>
                                                <span>{item?.views} <RemoveRedEyeIcon /></span>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="border__container"></div>


                                </>
                            )})
                        }
                    </div>
                </div>
                <Official />
            </div>
        </div>
    </>
  )
}

export default News
