import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Categories from '../components/Categories';
import {Helmet} from 'react-helmet-async'

function KitchenRack() {
    CleanUpLoader()
    const categoryValues = {
        category: 'kitchen_rack',
        categoryText: 'Kitchen rack'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Ntek kitchen racks</title>
        <meta name="description" content="Quality, durable and high performance kitchen racks and equipments" />
      </Helmet>
        <div>
            <Categories propsCategory={categoryValues} />
        </div>
        </React.Fragment>
    )
}

export default KitchenRack
