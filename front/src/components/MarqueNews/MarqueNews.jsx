import React, { useState } from 'react'
import './MarqueNews.css'
import Marquee from "react-fast-marquee";
import { axiosInstance } from '../../utils/axiosInstance';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function MarqueNews() {
  const {t, i18n} = useTranslation()
  const navigate = useNavigate()
  const [MarqueNews, setMarqueNews] = useState([])
  const getMarqueNews = () => {
      axiosInstance
        .get("marque-articles/")
        .then((res) => {
          setMarqueNews(res.data.results);
        })
        .catch((err) => { console.log(err) })
    };
    function handleClick(id) {
      navigate("/article", { state: id });
    }
  useEffect(() => {
        getMarqueNews()
      }, []);
  return (
    <div className='marque__wrapper'>
        <div className="marque__title">
            <p>
                {t("news")}
            </p>
        </div>
        <Marquee pauseOnHover>
          {MarqueNews?.map((item, index)=>{return(
            <a key={index} className='marque__news__list' onClick={() => handleClick(item.id)}>{
              i18n.language === 'tm'?
              item.title_tm:
              i18n.language === 'ru'?
              item.title_ru:
              i18n.language === 'en'?
              item.title_en:null
            }</a>
          )})}
        </Marquee>
    </div>
  )
}

export default MarqueNews