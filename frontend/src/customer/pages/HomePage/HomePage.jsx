import React from 'react'
// import MainCarousel from '../../components/HomeCarousel/MainCarousel'
import HomeSectionCard from '../../components/HomeSectionCard/HomeSectionCard'
import HomeSectionCarousel from '../../components/HomeSectionCarousel/HomeSectionCarousel'
import Footer from '../../components/Footer/Footer'
import HomeCollection from '../../components/HomeCollection/HomeCollection'
import Review from '../../components/Review/Review'
import Collaboration from '../../components/Collaboration/Collaboration'
import Navigation from '../../components/Navigation/Navigation'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'
import Jumbotron from '../../components/Jumbotron/Jumbotron'

const HomePage = () => {
  return (
    <div>
        <Navigation/>
        <Jumbotron/>
        {/* <MainCarousel/> */}
        <HomeSectionCard/>
        <HomeCollection/>
        <HomeSectionCarousel/>
        <Review/>
        <Collaboration/>
        <Footer/>
        <ScrollToTop/>
    </div>
  )
}

export default HomePage