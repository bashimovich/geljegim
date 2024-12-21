import React, { useEffect, useState } from 'react'
import './Similar.css'
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosInstance';
import HumanReadableDate from '../../utils/HumanReadableDate'
import { useTranslation } from 'react-i18next';
import { ShimmerCategoryItems } from 'shimmer-effects-react';

function Similar(props) {
    const {t, i18n} = useTranslation()

    const navigate  = useNavigate()
    const [Articles, setArticles] = useState(null)
    const [LoadingArticles, setLoadingArticles] = useState(true)

    useEffect(() => {
        window.scroll(0,0)
        setLoadingArticles(true)
        axiosInstance
            .get(`articles/via/${props.typear}/`)
            .then((res) => {
                setArticles(res.data.results)
                setLoadingArticles(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
    function handleClick(id) {
       navigate('/article/', {state: id}) 
    }
  return (
        <>
        <div className="daily__header">
            <div className="daily__title">
                <p>{t("related")}</p>
            </div>
            <div className="daily__all">
                <a>{t("showall")}</a>
            </div>
        </div> 
        <div className="daily__news__body">

            {
                LoadingArticles?

                <ShimmerCategoryItems className='schools_shimmer' mode="light" itemsGap={20} items={6} />:
            
            Articles?.map((item, index)=>{return (
                <div key={index} className="card__officiall__news">
                    {item.images_for_web && <div className="official__news__img" style={{ backgroundImage: `url(${item?.images_for_web[0].src})` }}></div>}
                    <div className="official__news_title">
                        <p className="officail__news__data">
                            <span> <HumanReadableDate date={item?.created_at} /> </span>
                        </p>
                        <p className="offical__news__description" onClick={()=>{handleClick(item.id)}}>
		    		        {
                                i18n.language === 'tm'?
                                item.title_tm:
                                i18n.language === 'ru'?
                                item.title_ru:
                                i18n.language === 'en'?
                                item.title_en:null
                            }
                        </p>
                    </div>
                </div>
            )})}
        </div>
        </>
  )
}

export default Similar
