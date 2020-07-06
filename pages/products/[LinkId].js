import React from 'react'
import { Row, Col, Card } from 'antd'

import Navigation from '../../components/navigation'
import LineChart from '../../components/lineChart'
import PieChart from '../../components/pieChart'

const Product = ({ product, revenue }) => {
	return (
		<Navigation section='products'>
            <Row gutter={[32, 32]}>
                <Col span={12}>
                    <Card title={product.Name} style={{marginBottom: 20}}>{product.Description}</Card>
                    <LineChart
                        title='Vendas Totais'
                        x='date'
                        y='value'
                        data={revenue.month}
                    />
                </Col>
                <Col span={12}>
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <PieChart
                                title='Vendas'
                                total={revenue.total}
                                x='name'
                                y='value'
                                data={revenue.channel}
                            />
                            <PieChart
                                title='Vendas'
                                total={revenue.total}
                                x='name'
                                y='value'
                                data={revenue.channel}
                            />
                        </Col>
                        <Col span={12}>
                            <PieChart
                                title='Vendas'
                                total={revenue.total}
                                x='name'
                                y='value'
                                data={revenue.channel}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
		</Navigation>
	)
}

export default Product

import getProducts, { getProduct } from '../../services/products'
import getRevenue from '../../services/revenue'
export async function getStaticPaths() {
    return { paths: getProducts().map(product => ({params: { LinkId: product.LinkId } })), fallback: false }
}

export async function getStaticProps(context) {
    const linkId = context.params.LinkId
    const product = getProduct(linkId)
    const revenue = getRevenue(linkId)
	return { props: { product, revenue } }
}
