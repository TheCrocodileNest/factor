import React from 'react'
import { Card } from 'antd'

import Navigation from '../components/navigation'
import PieChart from '../components/pieChart'
import LineChart from '../components/lineChart'

const Grid = ({ children }) => (
	<div style={{ display: 'grid', gap: 16, gridTemplateColumns: '3fr 2fr' }}>
		{children}
	</div>
)

const Dashboard = ({ revenue }) => {
	return (
		<Navigation section="dashboard">
			<Grid>
				<div style={{ gridRow: 'span 2' }}>
					<Card title="8 melhorias analisadas"></Card>
				</div>
				<LineChart
					title="Faturamento Diário"
					x="date"
					y="value"
					data={revenue.month}
				/>
				<PieChart
					title="Vendas por Canal"
					total={revenue.total}
					x="name"
					y="value"
					data={revenue.channel}
				/>
			</Grid>
		</Navigation>
	)
}

export default Dashboard

import getRevenue from '../services/revenue'
export function getStaticProps() {
	const revenue = getRevenue()
	return { props: { revenue } }
}
