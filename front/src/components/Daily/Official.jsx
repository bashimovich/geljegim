import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosInstance } from '../../utils/axiosInstance';
import HumanReadableDate from '../../utils/HumanReadableDate';
import './Daily.css'
import { useTranslation } from 'react-i18next'

function Official() {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const [Articles, setArticles] = useState([])
    function ShowAll(typear) {
      navigate("/articles", { state: typear });
    }
    useEffect(() => {
        axiosInstance
            .get(`/official-article/`)
            .then((res) => {
                setArticles(res?.data.results)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])
  return (
    <div className="daily__news">
        <div className="daily__header">
            <div className="daily__title">
                <p>{t("official")}</p>
            </div>
            <div className="daily__all">
                <a onClick={()=> {ShowAll('official')}}>{t("showall")}</a>
            </div>
        </div> 
        <div className="daily__news__body">
            {
                Articles.map((item, index) => {return (
                    <div key={index} className="card__officiall__news">
                        {item.images_for_web && <div className="official__news__img" style={{ backgroundImage: `url(${item.images_for_web[0].src})` }}></div>}
                        <div className="official__news_title">
                            <p className="officail__news__data">
                                <span>
                                    <HumanReadableDate date={item.created_at} />
                                </span>
                            </p>
                            <p className="offical__news__description">
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
                )})
            }

        </div>
    </div>
  )
}

export default Official