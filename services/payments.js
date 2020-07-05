import orders from '../data/orders.json'

const getPayments = ({month, channel}) => {
	let total = 0
	const days = {}
	const payments = {}

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

		if (payments[order.paymentNames] === undefined)
			payments[order.paymentNames] = {
				name: order.paymentNames,
				value: order.totalValue,
			}
		else payments[order.paymentNames].value += order.totalValue
	}

	return {
		month: Object.values(days),
		payment: Object.values(payments).sort((a, b) => {
			const x = a.name.toLowerCase()
			const y = b.name.toLowerCase()
			return x < y ? -1 : x > y ? 1 : 0;
		}),
		total,
	}
}

export default getPayments