import { Card, Row, Col, Divider } from 'antd'

import Navigation from '../components/navigation'
import PieChart from '../components/pieChart'

export default function Channels({ channels, payments, status }) {
	return (
		<Navigation section="channels">
			{channels.map((channel) => (
				<Card title={channel.Name} key={channel.Id} style={{width: '100%', marginBottom: '30px'}}>
				<Grid style={{width:'100%'}}>
					<Row>
						<Col flex={1} style={{marginRight: '20px'}}>
							<Card title='Produto em Destaque' style={{marginBottom: '20px'}}>
								{channel.spotlightProduct}
							</Card>
							<Card title='Categoria em Destaque' style={{marginBottom: '20px'}}>
								{channel.spotlightCategory}
							</Card>
						</Col>
						<Col flex={2}>
							<PieChart
								title="Vendas por meio de pagamento"
								total={payments[channel.Id].total}
								x="name"
								y="value"
								data={payments[channel.Id].payment}
							/>
						</Col>
						<Col flex={2}>
							<PieChart
								title="Balanço de status de vendas"
								x="name"
								y="value"
								data={status[channel.Id].status}
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
import getStatus from '../services/status'
export async function getStaticProps() {
	const channels = getChannels()
	const payments = {}
	const status = {}
	for (const channel of channels) {
		payments[channel.Id] = getPayments({channel: channel.Id})
		status[channel.Id] = getStatus({channel: channel.Id})
	}
	return { props: { channels, payments, status } }
}