import orders from '../data/orders.json'
import channels from '../data/channels.json'

function getChannelName(id) {
	const { Name } = channels.find(({ Id }) => Id === id)
	return Name
}

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

		if (days[order.creationDate] === undefined)
			days[order.creationDate] = {
				date: order.creationDate,
				value: totalValue,
			}
		else days[order.creationDate].value += totalValue

		if (channels[order.salesChannel] === undefined)
			channels[order.salesChannel] = {
				name: getChannelName(order.salesChannel),
				value: totalValue,
			}
		else channels[order.salesChannel].value += totalValue
	}

	return {
		month: Object.values(days),
		channel: Object.values(channels),
		total,
	}
}

export default getRevenue
