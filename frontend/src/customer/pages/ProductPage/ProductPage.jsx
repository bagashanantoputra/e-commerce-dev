import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navigation from '../../components/Navigation/Navigation'
import Product from '../../components/Product/Product'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

const ProductPage = () => {
    return (
        <div>
            <Navigation/>
            <Product/>
            <Footer/>
            <ScrollToTop/>
        </div>
    )
}

export default ProductPage