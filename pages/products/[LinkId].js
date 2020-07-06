import React from 'react'
import { Row, Col, Card } from 'antd'

import Navigation from '../../components/navigation'
import LineChart from '../../components/lineChart'
import PieChart from '../../components/pieChart'

const Product = ({ product, revenue, payments, status }) => {
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
								title="Balanço de status de vendas"
								x="name"
								y="value"
								data={status.status}
                            />
                        </Col>
                        <Col span={12}>
                            <PieChart
                                title="Vendas por meio de pagamento"
                                total={payments.total}
                                x="name"
                                y="value"
                                bordered={false}
                                data={payments.payment}
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
import getPayments from '../../services/payments'
import getStatus from '../../services/status'
export async function getStaticPaths() {
    return { paths: getProducts().map(product => ({params: { LinkId: product.LinkId } })), fallback: false }
}

export async function getStaticProps(context) {
    const linkId = context.params.LinkId
	const payments = getPayments({productLinkId: linkId})
    const status = getStatus({productLinkId: linkId})
    const product = getProduct(linkId)
    const revenue = getRevenue(linkId)
	return { props: { product, revenue, payments, status } }
}
