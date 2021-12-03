import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function HomeTheatre() {
    CleanUpLoader()
    const categoryValues = {
        category: 'home_theatre',
        categoryText: 'Home Theatre'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek home theatre gadgets</title>
        <meta name="description" content="Quality, durable and high performance home theatre" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default HomeTheatre
