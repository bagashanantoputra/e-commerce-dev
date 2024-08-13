import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import Profile from '../../components/Profile/Profile'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const ProfilePage = () => {
    return (
        <div>
            <Navigation/>
            <Profile/>
            <Footer/>
            <ScrollToTop/>
        </div>
    )
}

export default ProfilePage