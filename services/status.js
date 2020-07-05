import orders from '../data/orders.json'

const getStatus = ({month, channel}) => {
	let total = 0
	const days = {}
	const status = {}

	const ordersFromChannel = orders.filter(order => {
		return order.salesChannel == channel
	})
	for (const order of ordersFromChannel) {
		total += order.totalValue

		if (days[order.creationDate] === undefined)
			days[order.creationDate] = {
				date: order.creationDate,
				value: order.totalValue,
			}
		else days[order.creationDate].value += order.totalValue

		if (status[order.statusDescription] === undefined)
			status[order.statusDescription] = {
				name: order.statusDescription,
				value: order.totalValue,
			}
		else status[order.statusDescription].value += order.totalValue
	}

	return {
		month: Object.values(days),
		status: Object.values(status),
		total,
	}
}

export default getStatus