import React from 'react'
import './Article.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import HumanReadableDate from '../../utils/HumanReadableDate';
import DOMPurify from "dompurify";
import { useTranslation } from 'react-i18next';

function Article(props) {
  const {t, i18n} = useTranslation()
  return (
    <>
        <div className="article__image"   style={{ backgroundImage: `url(${props?.data.images_for_web[0].src})` }}></div>
        <div className="article__info">
            <p className="article__views"><span><RemoveRedEyeIcon /></span> {props?.data?.views}</p>
            <p className="article__date"><HumanReadableDate date={props?.data?.created_at}/></p>
        </div>
        <div className="article__content">
            <p className="article__title"  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
              i18n.language === 'tm'?
              props?.data?.title_tm:
              i18n.language === 'ru'?
              props?.data?.title_ru:
              i18n.language === 'en'?
              props?.data?.title_en:null
              ),}}></p>
            <p className="article__content__full"  dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(
              i18n.language === 'tm'?
              props?.data?.content_tm:
              i18n.language === 'ru'?
              props?.data?.content_ru:
              i18n.language === 'en'?
              props?.data?.content_en:null
              ),}}></p>
        </div>
    </>
  )
}

export default Article