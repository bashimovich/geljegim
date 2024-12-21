import React from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import './InfoPanel.css'
import { useTranslation } from 'react-i18next';
function InfoPanel() {
    const {i18n, t} = useTranslation()
    function changeLanguage(lang) {
       i18n.changeLanguage(lang)
    }
  return (
    <div>
        <div className="info__wrapper">
            <div className="container">
                <div className="lang__info">
                    <div className="info">
                        <div className="info__card">
                            <LocationOnIcon />
                            <p>{t('address')}, 22</p>
                        </div>
                        <div className="info__card">
                            <LocalPhoneIcon />
                            <p>+99312946014 / +99312946019</p>
                        </div>
                    </div>
                    <div className="languages__list">
                        <p 
                            className={i18n.language  === 'tm'? "lang active": 'lang'}
                            onClick={() => {changeLanguage('tm')}}
                            >TM</p>
                        <p>|</p>
                        <p 
                            className={i18n.language === 'ru'? "lang active": 'lang'}
                            onClick={() => {changeLanguage('ru')}}
                            >RU</p>
                        <p>|</p>
                        <p 
                            className={i18n.language === 'en'? "lang active": 'lang'}
                            onClick={() => {changeLanguage('en')}}
                            >EN</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InfoPanel