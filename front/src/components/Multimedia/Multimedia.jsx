import React, { useEffect, useState } from 'react'
import './Multimedia.css'
import { axiosInstance } from '../../utils/axiosInstance';
import { useNavigate } from 'react-router-dom';
import HumanReadableDate from '../../utils/HumanReadableDate';
import { useTranslation } from 'react-i18next';
import { ShimmerDiv, ShimmerTitle } from 'shimmer-effects-react';


function Multimedia() {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const [MultimediaArticle, setMultimediaArticle] = useState([])
    const [MultimediaLoading, setMultimediaLoading] = useState(true)
    useEffect(() => {
        setMultimediaLoading(true)
        axiosInstance
            .get(`/medias`)
            .then((res) => {
                setMultimediaArticle(res.data.results)
                setMultimediaLoading(false)
            })
            .catch((err) => {
            console.log(err);
            });
    }, [])
    // function handleClick(id) {
    //    navigate('article/', {state: id}) 
    // }
    function ShowAll() {
      navigate("/media");
    }
  return (
    <div className="container">
        <div className="multimedia">
            <div className="multimedia__header">
                <div className="multimedia__title">
                    <p>{t('multimedia')}</p>
                </div>
                <div className="multimedia__all">
                    <a onClick={() => {ShowAll()}}>{t('showall')}</a>
                </div>
            </div>
            <div className="multimedia__cards">
                {
                    MultimediaLoading ? 
                    <>
                        <ShimmerDiv mode="light" rounded={1} className='daily_main_img_shimmer' />
                        <ShimmerDiv mode="light" rounded={1} className='daily_main_img_shimmer' />
                        <ShimmerDiv mode="light" rounded={1} className='daily_main_img_shimmer' />
                        <ShimmerDiv mode="light" rounded={1} className='daily_main_img_shimmer' />
                    </>:
                    MultimediaArticle.map((item, index) => {return(
                        <div onClick={() => {ShowAll()}} className="multimedia__card" key={index}>
                            <div className="multimedia__card__img">
                                <img src={item.thumbnail} alt="" />
                            </div>
                            <div className="multimedia__card__date">
                                <p>
                                    <HumanReadableDate date={item.created_at} />
                                </p>
                            </div>
                            <div className="multimedia__card__title">
                                <p>{
                                    i18n.language === 'tm'?
                                        item.title_tm:
                                    i18n.language === 'ru'?
                                        item.title_ru:
                                    i18n.language === 'en'?
                                        item.title_en:null
                                }</p>
                            </div>
                        </div>
                    )})
                }
            </div>
        </div>
    </div>
  )
}

export default Multimedia
