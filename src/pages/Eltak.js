import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Brands from '../components/Brands'
import RecentlyViewed from '../utils/RecentlyViewed'
import {Helmet} from 'react-helmet-async'

function Eltak() {
    const localStorage = window.localStorage
    CleanUpLoader()
    const values = {
        CategoriesMarkUp: [
            {
                category: 'home_theatre',
                categoryText: 'Home Theatre'
            },
            {
                category: 'public_address_system',
                categoryText: 'Public Address System'
            },
            {
                category: 'solar_system',
                categoryText: 'Solar System'
            }
        ],
        brand: 'eltak'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Eltak brand</title>
        <meta name="description" content="Ntek official stores | quality and durables eltak products, includes public address systems, solar systems and home theatre" />
      </Helmet>
        <div>
            <Brands brandProps={values} />
            {localStorage.getItem("recentlyViewedItems") && <RecentlyViewed />}
        </div>
        </React.Fragment>
    )
}

export default Eltak
