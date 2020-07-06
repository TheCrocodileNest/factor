import React from 'react'
import { Card } from 'antd'

import Navigation from '../components/navigation'
import Insight from '../components/insight'

const Insights = ({ insights }) => (
	<Navigation section="insights">
		<Card title={`${insights.length} melhorias analisadas`}>
			{insights.map((insight) => (
				<Insight insight={insight} />
			))}
		</Card>
	</Navigation>
)

export default Insights

import getInsights from '../services/insights'
export function getStaticProps() {
	const insights = getInsights()
	return { props: { insights } }
}
