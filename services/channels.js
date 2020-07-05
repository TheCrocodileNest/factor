import channels from '../data/channels.json'
import orders from '../data/orders.json'

function getSpotlightProduct({ Name }) {
	const ordersFromChannel = orders.filter(order => {
		return order.salesChannel == Name
	})
	if (ordersFromChannel.length == 0) return 'Nenhum'

	var productMap = {}
	var detachProduct = null
	var maxProducts = 0

	for (const order of ordersFromChannel) {
		for (const item of order.items) {
			if (productMap[item.Name] == null) productMap[item.Name] = 1
			else productMap[item.Name]++

			if (productMap[item.Name] > maxProducts) {
				detachProduct = item.Name
				maxProducts = productMap[item.Name]
			}
		}
	}

	return detachProduct
}

function getSpotlightCategory({ Name }) {
	const ordersFromChannel = orders.filter(order => {
		return order.salesChannel == Name
	})
	if (ordersFromChannel.length == 0) return 'Nenhum'

	var categoryMap = {}
	var detachCategory = null
	var maxCategory = 0

	for (const order of ordersFromChannel) {
		for (const item of order.items) {
			if (categoryMap[item.CategoryId] == null) categoryMap[item.CategoryId] = 1
			else categoryMap[item.CategoryId]++

			if (categoryMap[item.CategoryId] > maxCategory) {
				detachCategory = item.CategoryName
				maxCategory = categoryMap[item.CategoryId]
			}
		}
	}

	return detachCategory
}

function getChannels() {
	return channels.map(channel => ({
		...channel,
		spotlightProduct: getSpotlightProduct(channel),
		spotlightCategory: getSpotlightCategory(channel),
	}))
}

export default getChannels
