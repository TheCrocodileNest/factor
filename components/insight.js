import React from 'react'
import { Card, Button } from 'antd'

const Apply = () => (
	<>
		<Button type="primary" style={{ marginLeft: 8 }}>
			Aplicar
		</Button>
		<Button style={{ marginLeft: 8 }}>Recusar</Button>
	</>
)
const Read = () => <Button type="link">Leia mais</Button>

const Insight = ({ insight }) => (
	<Card
		title={insight.message}
		extra={`Tipo ${insight.type}`}
		style={{ marginBottom: 16 }}
	>
		<span>{insight.recommendation}</span>
		{insight.action === 'apply' ? <Apply /> : <Read />}
	</Card>
)

export default Insight
