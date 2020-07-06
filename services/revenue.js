import orders from '../data/orders.json'
import channelsJson from '../data/channels.json'

function getRevenue(productLinkId = null) {
	let total = 0
	const days = {}
	const channels = {}

	for (let order of orders) {
		let totalValue = order.totalValue
		if (productLinkId !== null) {
			const itemProduct = order.items.filter(product => product.LinkId === productLinkId)
			totalValue = itemProduct.reduce((currentTotal, product) => currentTotal + product.Price, 0)
		}
		total += totalValue
		const channel = channelsJson.find(channel => {
			return channel.Id === order.salesChannel
		})

		if (days[order.creationDate] === undefined)
			days[order.creationDate] = {
				date: order.creationDate,
				value: totalValue,
			}
		else days[order.creationDate].value += totalValue

		if (channels[channel.Id] === undefined)
			channels[channel.Id] = {
				name: channel.Name,
				value: totalValue,
			}
		else channels[channel.Id].value += totalValue
	}

	return {
		month: Object.values(days),
		channel: Object.values(channels),
		total,
	}
}

export default getRevenue
