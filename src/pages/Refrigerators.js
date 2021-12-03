import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function Refrigerators() {
    CleanUpLoader()
    const categoryValues = {
        category: 'refrigerators',
        categoryText: 'Refrigerators'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek refrigerators</title>
        <meta name="description" content="Affordable, durable and high performance refrigerators" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default Refrigerators
