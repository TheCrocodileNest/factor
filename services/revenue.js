import orders from '../data/orders.json'

function getRevenue(month = 7) {
	let total = 0
	const days = {}
	const channels = {}

	for (let order of orders) {
		total += order.totalValue

		if (days[order.creationDate] === undefined)
			days[order.creationDate] = {
				date: order.creationDate,
				value: order.totalValue,
			}
		else days[order.creationDate].value += order.totalValue

		if (channels[order.salesChannel] === undefined)
			channels[order.salesChannel] = {
				name: order.salesChannel,
				value: order.totalValue,
			}
		else channels[order.salesChannel].value += order.totalValue
	}

	return {
		month: Object.values(days),
		channel: Object.values(channels),
		total,
	}
}

export default getRevenue
