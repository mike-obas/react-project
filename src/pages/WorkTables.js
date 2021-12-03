import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function WorkTables() {
    CleanUpLoader()
    const categoryValues = {
        category: 'work_tables',
        categoryText: 'Work tables'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek work tables and furnitures</title>
        <meta name="description" content="Buy Affordable and durable work tables. Available for offices and homes and event places" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default WorkTables
