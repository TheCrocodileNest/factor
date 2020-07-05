import { Card } from 'antd'

import Navigation from '../components/navigation'

export default function Channels({ channels }) {
	return (
		<Navigation section="channels">
			{channels.map(channel => (
				<Card title={channel.Name} key={channel.Id}>
					<div>
						<h4>Produto em Destaque</h4>
						<div>{channel.spotlightProduct}</div>
					</div>
					<div>
						<h4>Categoria em Destaque</h4>
						<div>{channel.spotlightCategory}</div>
					</div>
				</Card>
			))}
		</Navigation>
	)
}

import getChannels from '../services/channels'
export async function getStaticProps() {
	const channels = getChannels()
	return { props: { channels } }
}
