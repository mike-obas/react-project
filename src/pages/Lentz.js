import React from 'react'
import CleanUpLoader from '../utils/CleanUpLoader';
import Brands from '../components/Brands'
import RecentlyViewed from '../utils/RecentlyViewed'
import {Helmet} from 'react-helmet-async'

function Lentz() {
    const localStorage = window.localStorage
    CleanUpLoader()
    const values = {
        CategoriesMarkUp: [
            {
                category: 'commercial_oven',
                categoryText: 'Commercial oven'
            },
            {
                category: 'mixers',
                categoryText: 'Mixers'
            },
            {
                category: 'refrigerators',
                categoryText: 'Refrigerators'
            },
            {
                category: 'microwave_oven',
                categoryText: 'Microwave oven'
            },
            {
                category: 'deep_fryers',
                categoryText: 'Deep Fryers'
            },
            {
                category: 'work_tables',
                categoryText: 'Work tables'
            },
            {
                category: 'kitchen_rack',
                categoryText: 'Kitchen rack'
            },
            {
                category: 'blenders',
                categoryText: 'Blenders'
            },
            {
                category: 'commercial_cookers',
                categoryText: 'Commercial cookers'
            },
        ],
        brand: 'lentz'
    }
    return (
        <React.Fragment>
        <Helmet>
        <title>Lentz brand</title>
        <meta name="description" content="Ntek official stores | quality and durable Lentz products, includes commercial ovens, mixers, refrigerators, deep fryers, work tables, blenders, kitchen racks, microwave ovens, and commercial cookers" />
      </Helmet>
        <div>
            <Brands brandProps={values} />
            {localStorage.getItem("recentlyViewedItems") && <RecentlyViewed />}
        </div>
        </React.Fragment>
    )
}

export default Lentz
