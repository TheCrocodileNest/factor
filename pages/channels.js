import { Card, Row, Col, Divider } from 'antd'

import Navigation from '../components/navigation'
import PieChart from '../components/pieChart'

export default function Channels({ channels, payments }) {
	return (
		<Navigation section="channels">
			{channels.map((channel) => (
				<Card title={channel.Name} key={channel.Id} style={{ width: '100%', marginBottom: '30px' }}>
				<Grid style={{width:'100%'}}>
					<Row>
						<Col flex={1} style={{marginRight: '20px'}}>
							<Card title='Produto em Destaque' style={{marginBottom: '20px'}}>
								{channel.spotlightProduct}
							</Card>
							<Card title='Categoria em Destaque'>
								{channel.spotlightCategory}
							</Card>
						</Col>
						<Col flex={4}>
							<PieChart
								title="Vendas por meio de pagamento"
								total={payments[channel.Id].total}
								x="name"
								y="value"
								data={payments[channel.Id].payment}
							/>
						</Col>
					</Row>
				</Grid>
				</Card>
			))}
		</Navigation>
	)
}

import getChannels from '../services/channels'
import getPayments from '../services/payments'
import Grid from 'antd/lib/card/Grid'
export async function getStaticProps() {
	const channels = getChannels()
	const payments = {}
	for (const channel of channels) {
		payments[channel.Id] = getPayments({channel: channel.Id})
	}
	return { props: { channels, payments } }
}