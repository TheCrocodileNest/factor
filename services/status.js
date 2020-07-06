import orders from '../data/orders.json'

const getStatus = ({month, channel, productLinkId}) => {
	let total = 0
	const days = {}
	const status = {}
	let ordersFromChannel = orders

	if (channel) {
		ordersFromChannel = orders.filter(order => {
			return order.salesChannel == channel
		})
	}
	for (const order of ordersFromChannel) {
		let totalValue = order.totalValue
		if (productLinkId) {
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

		if (status[order.statusDescription] === undefined)
			status[order.statusDescription] = {
				name: order.statusDescription,
				value: totalValue,
			}
		else status[order.statusDescription].value += totalValue
	}

	return {
		month: Object.values(days),
		status: Object.values(status).sort((a, b) => {
			const x = a.name.toLowerCase()
			const y = b.name.toLowerCase()
			return x < y ? -1 : x > y ? 1 : 0;
		}),
		total,
	}
}

export default getStatus