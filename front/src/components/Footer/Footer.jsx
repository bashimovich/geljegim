import React from 'react'
import './Footer.css'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import logo from './../../assets/images/Geljegim.png'
import { useTranslation } from 'react-i18next';

function Footer() {
  const {t} = useTranslation()
  return (
    <div className="footer__wrapper">
        <div className="container">
          <div className="footer__cards">
            <div className="footer__card">
              <div className="footer__logo">
                <img src={logo} alt="" />
              </div>
              <div className="footer__copy__right">
                <p> 2024 TICIT. {t('right')}. </p>
              </div>
              <div className="footer__social__media__link">
                <TwitterIcon />
                <LinkedInIcon />
                <InstagramIcon />
              </div>
            </div>
            <div className="footer__card">
              <p className='habarlasmak'>{t('contact')}</p>
              <p className='address'>
                ticit@sanly.tm /  
                {t('address')} 22
                +99312946014 / +99312946019
                <a href="https://ticit.edu.tm" className='ticit__a'>www.ticit.edu.tm</a>
              </p>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Footer
