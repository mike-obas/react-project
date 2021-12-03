import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function Televisions() {
    CleanUpLoader()
    const categoryValues = {
        category: 'televisions',
        categoryText: 'Televisions'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Best Televisions Store</title>
        <meta name="description" content="High resolution televisions all available at Ntek Electronics stores" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default Televisions
