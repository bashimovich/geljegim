import React from 'react'
import InfoPanel from '../../components/Info/InfoPanel'
import Navigation from '../../components/Navigation/Navigation'
import MarqueNews from '../../components/MarqueNews/MarqueNews'
import Daily from '../../components/Daily/Daily'
import '../../App.css'
import Multimedia from '../../components/Multimedia/Multimedia'
import Schools from '../../components/Schools/Schools'
import Footer from '../../components/Footer/Footer'
function Home() {
  return (
    <>
        <InfoPanel />
        <Navigation />
        <MarqueNews />
        <Daily />
        <Multimedia />
        <Schools />
        <Footer />
    </>
  )
}

export default Home