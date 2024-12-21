import React, { useEffect, useState } from 'react'
import InfoPanel from '../../components/Info/InfoPanel'
import Navigation from '../../components/Navigation/Navigation'
import MarqueNews from '../../components/MarqueNews/MarqueNews'
import Official from '../../components/Daily/Official'
import './Search.css'
import { axiosInstance } from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import DOMPurify from "dompurify";
import { useTranslation } from 'react-i18next'

function Search() {
    const {t, i18n} = useTranslation()
    const [SearchInput, setSearchInput ] = useState('');
    const [SearchResult, setSearchResult ] = useState([]);
    const [SearchNoResult, setSearchNoResult] = useState('')
    const navigate = useNavigate()

    function getSearchResult(query) {
        axiosInstance
            .get(`articles?search=${query}`)
            .then((res) => {
                setSearchResult([])
                if ((res.data.results).length > 0) {
                    setSearchNoResult('')
                    setSearchResult(res.data.results)

                }else{
                    setSearchNoResult('Maglumat Tapylmady!')
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
    function handleClick(id) {
        navigate('/article/', {state: id}) 
        }

    useEffect(() => {
        window.scroll(0,0)
    }, [])

  return (
    <>
        <InfoPanel />
        <Navigation />
        <MarqueNews />
        <div className='container'>
            <div className="search__content__and__adds">
                <div className="search__asside">
                    <div className='search__input'>
                        <input type="text"
                        onChange={(e) => setSearchInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t('search')} />
                        <span onClick={()=>handleOnClick()}>
                            {t('search')}
                        </span>
                    </div>
                    <div className="search__results">
                        <div className="div__for__border">
                            <p>{SearchNoResult}</p>
                        </div>
                        {
                            SearchResult.map((item) => {return(
                                <div className="result" key={item.id}>
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
                                </div>
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

export default Search
