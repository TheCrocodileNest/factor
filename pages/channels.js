import { Card, Avatar } from 'antd'

import Navigation from '../components/navigation'
import PieChart from '../components/pieChart'

export default function Channels({ channels, payments, status }) {
	return (
		<Navigation section="channels">
			{channels.map((channel) => (
				<Card
					title={channel.Name}
					key={channel.Id}
					style={{ marginBottom: 16 }}
				>
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: '1fr 1fr 1fr',
						}}
					>
						<div>
							<Card title="Produto em Destaque" bordered={false}>
								<Avatar
									src={channel.spotlightProduct.image}
									size="large"
									shape="square"
								/>
								<span style={{ marginLeft: 8 }}>
									{channel.spotlightProduct.name}
								</span>
							</Card>
							<Card title="Categoria em Destaque" bordered={false}>
								{channel.spotlightCategory}
							</Card>
						</div>
						<PieChart
							title="Vendas por meio de pagamento"
							total={payments[channel.Id].total}
							x="name"
							y="value"
							bordered={false}
							data={payments[channel.Id].payment}
						/>
						<PieChart
							title="Balanço de status de vendas"
							x="name"
							y="value"
							bordered={false}
							data={status[channel.Id].status}
						/>
					</div>
				</Card>
			))}
		</Navigation>
	)
}

import getChannels from '../services/channels'
import getPayments from '../services/payments'
import getStatus from '../services/status'
export async function getStaticProps() {
	const channels = getChannels()
	const payments = {}
	const status = {}
	for (const channel of channels) {
		payments[channel.Id] = getPayments({ channel: channel.Id })
		status[channel.Id] = getStatus({ channel: channel.Id })
	}
	return { props: { channels, payments, status } }
}
