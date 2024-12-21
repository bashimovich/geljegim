import React, { useEffect, useState } from 'react'
import './Schools.css'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../utils/axiosInstance'
import HumanReadableDate from '../../utils/HumanReadableDate'
import DOMPurify from "dompurify";
import { useTranslation } from 'react-i18next'
import { ShimmerCategoryItems } from 'shimmer-effects-react';



function Schools() {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const [UniverArticle, setUniverArticle] = useState([])
    const [VacationalArticle, setVacationalArticle] = useState([])

    const [VacationalLoading, setVacationalLoading] = useState(true)
    const [UniverLoading, setUniverLoading] = useState(true)




    useEffect(() => {
        setUniverLoading(true)
        axiosInstance
            .get(`homeuniver-article/`)
            .then((res) => {
                setUniverArticle(res.data.results)
                setUniverLoading(false)
            })
            .catch((err) => {
            console.log(err);
            });
        setVacationalLoading(true)
        axiosInstance
            .get(`homevacational-article/`)
            .then((res) => {
                setVacationalArticle(res.data.results)
                setVacationalLoading(false)
            })
            .catch((err) => {
            console.log(err);
            });
    }, [])
    function handleClick(id) {
       navigate('article/', {state: id}) 
    }
    function ShowAll(typear) {
      navigate("/articles", { state: typear });
    }
  return (
    <div className="container">
        <div className="schools">
            <div className="universities">
                <div className="schools__header">
                    <div className="schools__title">
                        <p>{t("university")}</p>
                    </div>
                    <div className="schools__all">
                        <a onClick={() => {ShowAll('univer')}}>{t("showall")}</a>
                    </div>
                </div>
                <div className="schools__cards">
                    {
                        UniverLoading ? 
                            <ShimmerCategoryItems className='schools_shimmer' mode="light" itemsGap={20} items={6} />:

                        UniverArticle.map((item, index)=>{return(
                            <div key={index} className="schools__card">
                                <div className="schools__card__img"  style={{ backgroundImage: `url(${item.images_for_web[0].src})` }}></div>
                                <div className="schools__card__title">
                                    <p className="schools__card__data">
                                        <HumanReadableDate date={item.created_at} />
                                    </p>
                                    <p className="schools__card__name" onClick={()=>{handleClick(item.id)}}
                                          dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
                                            i18n.language === 'tm'?
                                            item.title_tm:
                                            i18n.language === 'ru'?
                                            item.title_ru:
                                            i18n.language === 'en'?
                                            item.title_en:null
                                            ),}}
                                        
                                        >
                                    </p>
                                    <p className="schools__card__description"
                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
                                            i18n.language === 'tm'?
                                            item.description_tm:
                                            i18n.language === 'ru'?
                                            item.description_ru:
                                            i18n.language === 'en'?
                                            item.description_en:null
                                            ),}}
                                    >
                                    </p>
                                </div>
                            </div>

                        )})
                    }
                </div>
            </div>
            <div className="vacaitional">
                <div className="schools__header">
                    <div className="schools__title">
                        <p>{t("vacational")}</p>
                    </div>
                    <div className="schools__all">
                        <a onClick={() => {ShowAll('vacational')}}>{t("showall")}</a>
                    </div>
                </div>
                <div className="schools__cards">
                    {
                         VacationalLoading ? 
                            <ShimmerCategoryItems className='schools_shimmer' mode="light" itemsGap={20} items={6} />:

                        VacationalArticle.map((item, index)=>{return(
                            <div key={index} className="schools__card">
                                <div className="schools__card__img"  style={{ backgroundImage: `url(${item.images_for_web[0].src})` }}></div>
                                <div className="schools__card__title">
                                    <p className="schools__card__data">
                                        <HumanReadableDate date={item.created_at} />
                                    </p>
                                    <p className="schools__card__name" onClick={() => {handleClick(item.id)}}
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
                                    <p className="schools__card__description" 
                                        dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(

                                            i18n.language ==='tm'?
                                                item.description_tm:
                                            i18n.language ==='ru'?
                                                item.description_ru:
                                            i18n.language ==='en'?
                                                item.description_en:null
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
    </div>
  )
}

export default Schools