import React, { useEffect, useState } from 'react'
import InfoPanel from '../../components/Info/InfoPanel'
import Navigation from '../../components/Navigation/Navigation'
import MarqueNews from '../../components/MarqueNews/MarqueNews'
import Official from '../../components/Daily/Official'
import './Vacancy.css'
import { axiosInstance } from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import DOMPurify from "dompurify";
import { useTranslation } from 'react-i18next'
import HumanReadableDate from '../../utils/HumanReadableDate'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { ShimmerTitle } from 'shimmer-effects-react';



function Vacancy() {
    const {t, i18n} = useTranslation()
    const [Vacancy, setVacancy ] = useState([]);
    const navigate = useNavigate()
    const [VacancyLoading, setVacancyLoading ] = useState(true);

    function getVacancy() {
        setVacancyLoading(true)
        axiosInstance
            .get(`vacancy`)
            .then((res) => {
                setVacancy(res.data.results)
                setVacancyLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleClick(params) {
	        window.open(`${params}`, '_blank');

        }
    useEffect(() => {
        window.scroll(0,0)
        getVacancy()
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
                            VacancyLoading ?
                            <>
                            <div className="result_vacancy">
                                <ShimmerTitle mode="light" line={3} gap={8} />
                            </div>
                            <div className="border__container"></div>
                            <div className="result_vacancy">
                                <ShimmerTitle mode="light" line={3} gap={8} />
                            </div>
                            <div className="border__container"></div>
                            <div className="result_vacancy">
                                <ShimmerTitle mode="light" line={3} gap={8} />
                            </div>
                            <div className="border__container"></div>
                            <div className="result_vacancy">
                                <ShimmerTitle mode="light" line={3} gap={8} />
                            </div>
                            <div className="border__container"></div>
                            <div className="result_vacancy">
                                <ShimmerTitle mode="light" line={3} gap={8} />
                            </div>
                            <div className="border__container"></div>
                            <div className="result_vacancy">
                                <ShimmerTitle mode="light" line={3} gap={8} />
                            </div>
                            <div className="border__container"></div>
                            </>:
                            Vacancy.map((item) => {return(
                                <>
                                    <div className="result_vacancy" key={item.id}>
                                        <div className="content__container_vacancy">
                                            <h1 onClick={() => handleClick(item.vacancy_url)} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
                                                i18n.language === 'tm'?
                                                item?.title_tm:
                                                i18n.language === 'ru'?
                                                item?.title_ru:
                                                i18n.language === 'en'?
                                                item?.title_en:null

                                                ),}}></h1>
                                            <p className='views__time'>
                                                {/* <span>{item?.views} <RemoveRedEyeIcon /></span> */}
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

export default Vacancy
