import getRevenue from '../services/revenue'

const getInsights = () => {
	let insights = []

	const revenue = getRevenue()
	for (let channel of revenue.channel) {
		const percent = Math.round((channel.value / revenue.total) * 100)
		if (percent < 20)
			insights.push({
				message: `As vendas no canal ${channel.name} representaram apenas ${percent}% da receita`,
				recommendation: 'Redistribuir estoque para demais canais',
				type: 'channel',
				channel: channel,
				action: 'apply',
			})
	}

	return insights
}

export default getInsights
