import React, { useEffect, useState } from 'react'
import InfoPanel from '../../components/Info/InfoPanel'
import Navigation from '../../components/Navigation/Navigation'
import MarqueNews from '../../components/MarqueNews/MarqueNews'
import Official from '../../components/Daily/Official'
import './Media.css'
import { axiosInstance } from '../../utils/axiosInstance'
import { useNavigate } from 'react-router-dom'
import DOMPurify from "dompurify";
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'
import { ImageAlbum } from '../../components/ImageAlbum/ImageAlbum'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Footer from '../../components/Footer/Footer'
import { useTranslation } from 'react-i18next';





function Media() {
    const {t, i18n} = useTranslation()
    const navigate = useNavigate()
    const [MediaList, setMediaList] = useState([])
    const [isAlbumOpen, setisAblumOpen] = useState(false);
    const [AlbumImages, setAlbumImages] = useState([]);

    const isAlbumOpenFunc = (img) => {
        setAlbumImages(img)
        setisAblumOpen(!isAlbumOpen)
    };
    function getMedias() {
        axiosInstance
            .get('/medias/')
            .then((res) => {
                setMediaList(res.data.results)
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        window.scroll(0,0)
        getMedias()
    }, [])

  return (
    <>
        <InfoPanel />
        <Navigation />
        <MarqueNews />


        <div className='container'>
            <div className="search__content__and__adds">
                <div className="search__asside">
                    {
                        isAlbumOpen ? <div>
                            <p className='back__icon' onClick={() => {isAlbumOpenFunc()}}><ArrowBackIcon /></p><ImageAlbum images={AlbumImages} /> 
                        </div>:
                        MediaList.map((item, index) => {return (
                            <div className="media__card" key={item.id}>
                                {
                                    item._type == 'video' ? 
                                        <VideoPlayer
                                            videoSrc={item?.video}
                                            thumbnailSrc={item?.thumbnail}
                                        />: 
                                        <img onClick={() => {isAlbumOpenFunc(item.images_for_web)}} src={item.thumbnail} className='img__thumbnail' alt="" />
                                }
                                <p className='media__title' dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
                                        i18n.language === 'tm'?
                                        item.title_tm:
                                        i18n.language === 'en'?
                                        item.title_en:
                                        i18n.language === 'ru'?
                                        item.title_ru:null

				),}}></p>
                                
                            </div>
                        )})
                    }
                </div>
                <Official />
            </div>
        </div>


        <Footer />
    </>
  )
}

export default Media
