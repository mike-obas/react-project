import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function SolarSystem() {
    CleanUpLoader()
    const categoryValues = {
        category: 'solar_system',
        categoryText: 'Solar system'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek solar systems</title>
        <meta name="description" content="Affordable and durable solar lightening and power systems" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default SolarSystem
