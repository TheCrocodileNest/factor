import React from 'react'
import { useRouter } from 'next/router'

import Navigation from '../../components/navigation'

import products from '../../data/products.json'


const Product = () => {
    const router = useRouter()
    const { LinkId } = router.query
	return (
		<Navigation section='products'>
            <p>{LinkId}</p>
		</Navigation>
	)
}

export default Product
