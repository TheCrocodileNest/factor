import getRevenue from '../services/revenue'
import getStatus from '../services/status'

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

		const { status, total } = getStatus({ channel: channel.id })
		for (let stat of status) {
			if (stat.name === 'Cancelado') {
				const percent = Math.round((stat.value / total) * 100)
				if (percent > 10)
					insights.push({
						message: `A taxa de cancelamento no canal ${channel.name} é de ${percent}%`,
						recommendation:
							'Uma grande taxa de cancelamento pode ser causada por diversos fatores.',
						type: 'channel',
						channel: channel,
						action: 'read',
					})
			}
		}
		console.log(status)
	}

	return insights
}

export default getInsights
