import React, { useEffect, useState } from 'react'
import './Docs.css'
import Footer from '../../components/Footer/Footer'
import InfoPanel from '../../components/Info/InfoPanel'
import Navigation from '../../components/Navigation/Navigation'
import MarqueNews from '../../components/MarqueNews/MarqueNews'
import { axiosInstance } from '../../utils/axiosInstance'
import DOMPurify from "dompurify";
import CancelIcon from '@mui/icons-material/Cancel';
import { useTranslation } from 'react-i18next'
import { ShimmerTitle } from 'shimmer-effects-react';

function Docs() {
    const {t, i18n} = useTranslation()
    const [SearchInput, setSearchInput ] = useState('');
    const [SearchResult, setSearchResult ] = useState([]);
    const [SearchNoResult, setSearchNoResult] = useState('')
    const [isActiveView , setisActiveView] = useState(false)
    const [pdfSrc , setpdfSrc] = useState()
    const [DocsLoading , setDocsLoading] = useState(true)

    function getSearchResult(query) {
        setDocsLoading(true)
        axiosInstance
            .get(`docs?search=${query}`)
            .then((res) => {
                setSearchResult([])
                if ((res.data.results).length > 0) {
                    setSearchNoResult('')
                    setSearchResult(res.data.results)
                    setDocsLoading(false)
                }else{
                    setSearchNoResult('Maglumat Tapylmady!')
                    setDocsLoading(false)
                }
            })
            .catch((err) => {
                console.log(err);
            });
        
    }
    function getLaws(query) {
        setDocsLoading(true)
        axiosInstance
            .get('docs')
            .then((res) => {
                setSearchResult([])
                if ((res.data.results).length > 0) {
                    setSearchNoResult('')
                    setSearchResult(res.data.results)
                    setDocsLoading(false)

                }else{
                    setSearchNoResult('Maglumat Tapylmady!')
                    setDocsLoading(false)
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
        window.scroll(0,0)
    }, [])
  return (
    <>
    <InfoPanel />
    <Navigation />
    <MarqueNews />
        <div className="Docs__wrapper">
            <div className="container">
                <div className="Docss__flex">
                    <div className="Docss__list">
                        <div className={isActiveView ? "search__asside active__viewer":'search__asside'}>
                            <div className='search__input'>
                                <input type="text"
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={t('search')}/>
                                <span onClick={()=>handleOnClick()}>
                                    {t('search')}
                                </span>
                            </div>
                            <div className="search__results">
                                <div className="div__for__border">
                                    <p>{SearchNoResult}</p>
                                </div>
                                {
                                    DocsLoading ?
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
                                    </>:
                                    SearchResult.map((item) => {return(
                                        <div className="result" key={item.id}>
                                            <h1 onClick={() => handleClick(item.docs)} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
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
                                        </div>
                                    )})
                                }
                            </div>
                        </div>
                    </div>
                    <div className={isActiveView ? 'pdf__viewer active__viewer':'pdf__viewer'}>
                        <h1 onClick={() => closeViewer()} className={isActiveView ? 'close__view active__close':'close__view'} ><CancelIcon /></h1>
                        <iframe src={pdfSrc} frameborder="0"></iframe>
                    </div>
                </div>
            </div>
        </div>
    <Footer />
    </>
  )
}

export default Docs
