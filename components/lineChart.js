import React from 'react'
import { Card } from 'antd'
import { VictoryArea, VictoryChart, VictoryAxis } from 'victory'

const dateFormat = ['pt', { day: 'numeric', month: 'numeric' }]

const LineChart = ({ title, data, x, y, bordered = true }) => (
	<Card title={title} bordered={bordered}>
		<VictoryChart padding={64}>
			<VictoryArea
				data={data}
				x={x}
				y={y}
				interpolation="basis"
				style={{
					data: { strokeWidth: 2, stroke: '#30a9f2', fill: '#109CF110' },
				}}
			/>
			<VictoryAxis
				dependentAxis
				tickFormat={value => `R$ ${value}`}
				style={{
					axis: { stroke: 'transparent' },
					tickLabels: { stroke: '#4c5862', fontSize: 12, fontWeight: 100 },
					grid: { stroke: '#d8dce1', strokeDasharray: [5, 5] },
				}}
			/>
			<VictoryAxis
				style={{ axis: { stroke: 'transparent' } }}
				tickFormat={date => new Date(date).toLocaleDateString(...dateFormat)}
			/>
		</VictoryChart>
	</Card>
)

export default LineChart
