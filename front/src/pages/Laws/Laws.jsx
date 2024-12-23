import React, { useEffect, useState } from 'react'
import './Laws.css'
import Footer from '../../components/Footer/Footer'
import InfoPanel from '../../components/Info/InfoPanel'
import Navigation from '../../components/Navigation/Navigation'
import MarqueNews from '../../components/MarqueNews/MarqueNews'
import { axiosInstance } from '../../utils/axiosInstance'
import DOMPurify from "dompurify";
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next'
import { ShimmerTitle } from 'shimmer-effects-react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'



function Laws() {
    const { t, i18n } = useTranslation()
    const [SearchInput, setSearchInput] = useState('');
    const [SearchResult, setSearchResult] = useState([]);
    const [SearchNoResult, setSearchNoResult] = useState('')
    const [isActiveView, setisActiveView] = useState(false)
    const [pdfSrc, setpdfSrc] = useState()
    const [LawsLoading, setLawsLoading] = useState(true)
    // pagination
    const [TotalItem, setTotalItem] = useState(0)
    const [CurrentPage, setCurrentPage] = useState(1)
    const [PreviousPage, setPreviousPage] = useState(0)
    const [NextPage, setNextPage] = useState(0)
    const [LastPage, setLastPage] = useState(0)
    function LastPageFunc(count){
        if(count % 15 > 0){
            setLastPage(Math.floor(count/15 + 1))
        }else{
            setLastPage(Math.floor(count/15))
        }
    }

    function getSearchResult(query) {
        setLawsLoading(true)
        axiosInstance
            .get(`laws?search=${query}`)
            .then((res) => {
                setSearchResult([])
                if ((res.data.results).length > 0) {
                    setSearchNoResult('')
                    setSearchResult(res.data.results)
                    setLawsLoading(false)
                } else {
                    setSearchNoResult('Maglumat Tapylmady!')
                    setLawsLoading(false)
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }
    function getLaws(page=1) {
        setLawsLoading(true)
        axiosInstance
            .get(`laws/?page=${page}`)
            .then((res) => {
                setSearchResult([])
                if ((res.data.results).length > 0) {
                    setSearchNoResult('')
                    setSearchResult(res.data.results)
                    setTotalItem(res.data.count)
                    setPreviousPage(res.data.previous)
                    setNextPage(res.data.next)
                    LastPageFunc(TotalItem)
                    setCurrentPage(page)
                    setLawsLoading(false)

                } else {
                    setSearchNoResult('Maglumat Tapylmady!')
                    setLawsLoading(false)
                }
            })
            .catch((err) => {
                console.log(err);
            });

    }
    function handleOnClick(params) {
        getSearchResult(SearchInput)
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            getSearchResult(SearchInput)
        }
    };
    function handleClick(url) {
        setisActiveView(true)
        const googleDocsViewer = `https://docs.google.com/gview?url=${url}&embedded=true`;
        setpdfSrc(googleDocsViewer)
    }

    function closeViewer() {
        setisActiveView(false)
    }
    useEffect(() => {
        getLaws()
        window.scroll(0, 0)
    }, [])
    return (
        <>
            <InfoPanel />
            <Navigation />
            <MarqueNews />
            <div className="laws__wrapper">
                <div className="container">
                    <div className="laws__flex">
                        <div className="laws__list">
                            <div className={isActiveView ? "search__asside active__viewer" : 'search__asside'}>
                                <div className='search__input'>
                                    <input type="text"
                                        onChange={(e) => setSearchInput(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder={t('search')} />
                                    <span onClick={() => handleOnClick()}>
                                        {t('search')}
                                    </span>
                                </div>
                                <div className="search__results">
                                    <div className="div__for__border">
                                        <p>{SearchNoResult}</p>
                                    </div>
                                    {
                                        LawsLoading ?
                                            <>
                                                <ShimmerTitle mode="light" line={3} gap={8} />
                                                <ShimmerTitle mode="light" line={3} gap={8} />
                                                <ShimmerTitle mode="light" line={3} gap={8} />
                                                <ShimmerTitle mode="light" line={3} gap={8} />
                                                <ShimmerTitle mode="light" line={3} gap={8} />
                                                <ShimmerTitle mode="light" line={3} gap={8} />
                                                <ShimmerTitle mode="light" line={3} gap={8} />
                                                <ShimmerTitle mode="light" line={3} gap={8} />
                                                <ShimmerTitle mode="light" line={3} gap={8} />

                                            </> :

                                            SearchResult.map((item) => {
                                                return (
                                                    <div className="result" key={item.id}>
                                                        <h1 onClick={() => handleClick(item.pdf)} dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(
                                                                i18n.language === 'tm' ?
                                                                    item?.title_tm :
                                                                    i18n.language === 'ru' ?
                                                                        item?.title_ru :
                                                                        i18n.language === 'en' ?
                                                                            item?.title_en : null
                                                            ),
                                                        }}></h1>
                                                        <p dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(
                                                                i18n.language === 'tm' ?
                                                                    item?.description_tm :
                                                                    i18n.language === 'ru' ?
                                                                        item?.description_ru :
                                                                        i18n.language === 'en' ?
                                                                            item?.description_en : null
                                                            ),
                                                        }}></p>
                                                    </div>
                                                )
                                            })
                                    }
                                </div>
                            </div>
                            {TotalItem > 15 ?
                            <div className="flex items-center justify-between border-t border-green-200 bg-white px-4 py-3 sm:px-6">
                                <div className="flex flex-1 justify-between sm:hidden">
                                    <a
                                        href="#"
                                        className="relative inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-lg font-medium text-green-700 hover:bg-green-50"
                                    >
                                        Previous
                                    </a>
                                    <a
                                        href="#"
                                        className="relative ml-3 inline-flex items-center rounded-md border border-green-300 bg-white px-4 py-2 text-lg font-medium text-green-700 hover:bg-green-50"
                                    >
                                        Next
                                    </a>
                                </div>
                                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                                    <div>
                                        <p className="text-lg text-green-700">
                                            Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                                            <span className="font-medium">{TotalItem}</span> results
                                        </p>
                                    </div>
                                    <div>
                                        <nav aria-label="Pagination" className="isolate inline-flex -space-x-px rounded-md shadow-sm">
                                            {PreviousPage != null?
                                            <a
                                                href=""
                                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-green-400 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                                                onClick={()=>{getLaws(CurrentPage-1)}}
                                            >
                                                <span className="sr-only" >Previous</span>
                                                <ChevronLeftIcon aria-hidden="true" className="size-5" />
                                            </a>:
                                            <a
                                                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-green-400 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                                            >
                                                <span className="sr-only" >Previous</span>
                                                <ChevronLeftIcon aria-hidden="true" className="size-5" />
                                            </a>
                                            }
                                            {CurrentPage > 4 ? 
                                            <a
                                                href="#"
                                                className="relative hidden items-center px-4 py-2 text-lg font-semibold text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                                onClick={()=>{getLaws(1)}}
                                            >
                                                1
                                            </a>:''}

                                            {(CurrentPage != 2 && CurrentPage != 1) ?
                                            <a
                                                href="#"
                                                className="relative hidden items-center px-4 py-2 text-lg font-semibold text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                                onClick={()=>{getLaws(CurrentPage-2)}}
                                            >
                                                {CurrentPage-2}
                                            </a>:''}
                                            {(CurrentPage != 1) ?
                                            <a
                                                href="#"
                                                className="relative hidden items-center px-4 py-2 text-lg font-semibold text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                                onClick={()=>{getLaws(CurrentPage-1)}}
                                            >
                                                {CurrentPage-1}
                                            </a>:''}
                                            <a
                                                href="#"
                                                aria-current="page"
                                                className="relative z-10 inline-flex items-center bg-green-600 px-4 py-2 text-lg font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                                            >
                                                {CurrentPage}
                                            </a>
                                            {CurrentPage + 1 != LastPage && CurrentPage < LastPage? 
                                            <a
                                                href="#"
                                                className="relative inline-flex items-center px-4 py-2 text-lg font-semibold text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                                                onClick={()=>{getLaws(CurrentPage+1)}}
                                            >
                                                {CurrentPage+1}
                                            </a>:""}
                                            {CurrentPage < LastPage - 2 ?
                                            <span className="relative inline-flex items-center px-4 py-2 text-lg font-semibold text-green-700 ring-1 ring-inset ring-green-300 focus:outline-offset-0">
                                                ...
                                            </span>:""}
                                            {CurrentPage != LastPage ?
                                            <a
                                                href="#"
                                                className="relative hidden items-center px-4 py-2 text-lg font-semibold text-green-900 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
                                                onClick={()=>{getLaws(LastPage)}}

                                            >
                                                {LastPage}
                                            </a>:""}
                                            {NextPage != null?
                                            <a
                                                href="#"
                                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-green-400 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                                                onClick={()=>{getLaws(CurrentPage+1)}}
                                            >
                                                <span className="sr-only">Next</span>
                                                <ChevronRightIcon aria-hidden="true" className="size-5" />
                                            </a>:
                                            <a
                                                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-green-400 ring-1 ring-inset ring-green-300 hover:bg-green-50 focus:z-20 focus:outline-offset-0"
                                            >
                                                <span className="sr-only">Next</span>
                                                <ChevronRightIcon aria-hidden="true" className="size-5" />
                                            </a>}
                                        </nav>
                                    </div>
                                </div>
                            </div>:""}
                        </div>
                        <div className={isActiveView ? 'pdf__viewer active__viewer' : 'pdf__viewer'}>
                            <h1 onClick={() => closeViewer()} className={isActiveView ? 'close__view active__close' : 'close__view'} ><CancelIcon /></h1>
                            <iframe src={pdfSrc} frameborder="0"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Laws
