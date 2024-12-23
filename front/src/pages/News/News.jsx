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
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'



function News() {
    const {t, i18n} = useTranslation()
    const [News, setNews ] = useState([]);
    const navigate = useNavigate()
    const [NewsLoading, setNewsLoading ] = useState(true);
    // pagination
    const [TotalItem, setTotalItem] = useState(15)
    const [CurrentPage, setCurrentPage] = useState(1)
    const [PreviousPage, setPreviousPage] = useState(null)
    const [NextPage, setNextPage] = useState(null)
    const [LastPage, setLastPage] = useState(2)
    function LastPageFunc(count){
        if(count % 15 > 0){
            setLastPage(Math.floor(count/15 + 1))
        }else{
            setLastPage(Math.floor(count/15))
        }
    }

    function getNews(page=1) {
        setNewsLoading(true)
        axiosInstance
            .get(`all-news/?page=${page}`)
            .then((res) => {
                setNews(res.data.results)
                setTotalItem(res.data.count)
                setPreviousPage(res.data.previous)
                setNextPage(res.data.next)
                LastPageFunc(res.data.count)
                setCurrentPage(page)
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
        // window.scroll(0,0)
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
                    {TotalItem > 15 ?
                            <div className="flex items-center justify-between border-t border-green-200 bg-white px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    {PreviousPage != null?
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-3xl	 font-medium text-green-700 hover:bg-green-50"
                                        onClick={()=>{getNews(CurrentPage - 1)}}
                                    >
                                        {t("previous")}
                                    </a>:
                                    <a
                                        className="relative inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-3xl	 font-medium text-green-700 hover:bg-green-50"
                                    >
                                        {t("previous")}
                                    </a>}
                                    {NextPage != null?
                                    <a
                                        href="#"
                                        className="relative ml-3 inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-3xl	 font-medium text-green-700 hover:bg-green-50"
                                        onClick={() => getNews(CurrentPage + 1)}
                                    >
                                        {t("next")}
                                    </a>:
                                    <a
                                        className="relative ml-3 inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-3xl	 font-medium text-green-700 hover:bg-green-50"
                                    >
                                        {t("next")}
                                    </a>}
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-3xl	 text-green-700">
                                            <span className="font-medium"></span> <span className="font-medium"></span>
                                            <span className="font-medium"></span>
                                        </p>
                                    </div>
                                    <div>
                                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                            {PreviousPage != null?
                                            <a
                                                href="#"
                                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-green-400 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                                                onClick={()=>{getNews(CurrentPage - 1)}}
                                            >
                                                <span className="sr-only" >{t("previous")}</span>
                                                <ChevronLeftIcon aria-hidden="true" className="size-5" />
                                            </a>:
                                            <a
                                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-green-400 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                                            >
                                                <span className="sr-only" >{t("previous")}</span>
                                                <ChevronLeftIcon aria-hidden="true" className="size-5" />
                                            </a>
                                            }
                                            {CurrentPage > 4 ? 
                                            <a
                                                href="#"
                                                className="relative hidden items-center px-4 py-2 text-3xl	 font-semibold text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                                onClick={()=>{getNews(1)}}
                                            >
                                                1
                                            </a>:''}

                                            {(CurrentPage != 2 && CurrentPage != 1) ?
                                            <a
                                                href="#"
                                                className="relative hidden items-center px-4 py-2 text-3xl	 font-semibold text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                                onClick={()=>{getNews(CurrentPage-2)}}
                                            >
                                                {CurrentPage-2}
                                            </a>:''}
                                            {(CurrentPage != 1) ?
                                            <a
                                                href="#"
                                                className="relative hidden items-center px-4 py-2 text-3xl	 font-semibold text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                                onClick={()=>{getNews(CurrentPage-1)}}
                                            >
                                                {CurrentPage-1}
                                            </a>:''}
                                            <a
                                                href="#"
                                                aria-current="page"
                                                className="relative z-10 inline-flex items-center bg-green-600 px-4 py-2 text-3xl	 font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                            >
                                                {CurrentPage}
                                            </a>
                                            {CurrentPage + 1 != LastPage && CurrentPage < LastPage? 
                                            <a
                                                href="#"
                                                className="relative inline-flex items-center px-4 py-2 text-3xl	 font-semibold text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                                                onClick={()=>{getNews(CurrentPage+1)}}
                                            >
                                                {CurrentPage+1}
                                            </a>:""}
                                            {CurrentPage < LastPage - 2 ?
                                            <span className="relative inline-flex items-center px-4 py-2 text-3xl	 font-semibold text-green-700 ring-1 ring-inset ring-green-300 focus:outline-offset-0">
                                                ...
                                            </span>:""}
                                            {CurrentPage != LastPage ?
                                            <a
                                                href="#"
                                                className="relative hidden items-center px-4 py-2 text-3xl	 font-semibold text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                                onClick={()=>{getNews(LastPage)}}

                                            >
                                                {LastPage}
                                            </a>:""}
                                            {NextPage != null?
                                            <a
                                                href="#"
                                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-green-400 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                                                onClick={()=>{getNews(CurrentPage+1)}}
                                            >
                                                <span className="sr-only">{t("next")}</span>
                                                <ChevronRightIcon aria-hidden="true" className="size-5" />
                                            </a>:
                                            <a
                                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-green-400 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                                            >
                                                <span className="sr-only">{t("next")}</span>
                                                <ChevronRightIcon aria-hidden="true" className="size-5" />
                                            </a>}
                                        </nav>
                                    </div>
                                </div>
                            </div>:""}
                    </div>
                </div>
                <Official />
            </div>
        </div>
    </>
  )
}

export default News
