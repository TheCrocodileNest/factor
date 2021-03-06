import React from 'react'
import { Card } from 'antd'
import { VictoryPie, VictoryLabel, VictoryLegend } from 'victory'

const PieChart = ({ title, data, x, y, total, bordered = true, colorScale = 'qualitative' }) => (
	<Card title={title} bordered={bordered}>
		<svg viewBox="0 0 650 400">
			{total !== undefined ? (
				<VictoryLabel
					textAnchor="middle"
					style={{ fontSize: 25 }}
					x={200}
					y={200}
					text={new Intl.NumberFormat('pt', {
						style: 'currency',
						currency: 'BRL',
					}).format(total)}
				/>
			) : null}
			<VictoryPie
				standalone={false}
				width={400}
				height={400}
				data={data}
				x={x}
				y={y}
				innerRadius={125}
				colorScale={colorScale}
				labels={[]}
			/>
			<VictoryLegend
				standalone={false}
				x={400}
				y={50}
				centerTitle
				gutter={20}
				data={data.map((item) => ({ name: item[x] }))}
				style={{ labels: { fontSize: 20 } }}
				colorScale={colorScale}
			/>
		</svg>
	</Card>
)

export default PieChart
