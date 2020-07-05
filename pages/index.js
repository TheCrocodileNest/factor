import React from 'react'
import { Row, Col, Layout, Card } from 'antd'

import Navigation from '../components/navigation'
import PieChart from '../components/pieChart'
import LineChart from '../components/lineChart'

const Dashboard = () => {
	return (
		<Navigation section="dashboard">
			<Row gutter={16}>
				<Col flex={4}>
					<Card title="8 melhorias analisadas"></Card>
				</Col>
				<Col flex={1}>
					<LineChart
						title="Faturamento Diário"
						x="date"
						data={[
							{ date: new Date('2020-07-01T03:00:00.000Z'), y: 50 },
							{ date: new Date('2020-07-02T03:00:00.000Z'), y: 150 },
							{ date: new Date('2020-07-03T03:00:00.000Z'), y: 60 },
							{ date: new Date('2020-07-04T03:00:00.000Z'), y: 100 },
						]}
					/>
					<PieChart
						title="Vendas por Canal"
						total={'R$ 4,700.32'}
						x="name"
						y="value"
						data={[
							{ name: 'Shopping', value: 35 },
							{ name: 'Site', value: 40 },
							{ name: 'Mercado Livre', value: 55 },
						]}
					/>
				</Col>
			</Row>
		</Navigation>
	)
}

export default Dashboard
