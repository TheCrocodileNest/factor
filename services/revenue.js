import orders from '../data/orders.json'
import channelsJson from '../data/channels.json'

function getRevenue(month = 7) {
	let total = 0
	const days = {}
	const channels = {}

	for (let order of orders) {
		total += order.totalValue
		const channel = channelsJson.find(channel => {
			return channel.Id === order.salesChannel
		})

		if (days[order.creationDate] === undefined)
			days[order.creationDate] = {
				date: order.creationDate,
				value: order.totalValue,
			}
		else days[order.creationDate].value += order.totalValue

		if (channels[channel.Id] === undefined)
			channels[channel.Id] = {
				name: channel.Name,
				value: order.totalValue,
			}
		else channels[channel.Id].value += order.totalValue
	}

	return {
		month: Object.values(days),
		channel: Object.values(channels),
		total,
	}
}

export default getRevenue
