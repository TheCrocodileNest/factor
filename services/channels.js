import channels from '../data/channels.json'
import orders from '../data/orders.json'

function getSpotlightProduct({ Id }) {
	const ordersFromChannel = orders.filter((order) => {
		return order.salesChannel == Id
	})
	if (ordersFromChannel.length == 0) return 'Nenhum'

	var productMap = {}
	var spotlightProduct = null
	var maxProducts = 0

	for (const order of ordersFromChannel) {
		for (const item of order.items) {
			if (productMap[item.RefId] == null) productMap[item.RefId] = 1
			else productMap[item.RefId]++

			if (productMap[item.RefId] > maxProducts) {
				spotlightProduct = {
					name: item.Name,
					image: item.Image,
				}
				maxProducts = productMap[item.RefId]
			}
		}
	}

	return spotlightProduct
}

function getSpotlightCategory({ Id }) {
	const ordersFromChannel = orders.filter((order) => {
		return order.salesChannel == Id
	})
	if (ordersFromChannel.length == 0) return 'Nenhum'

	var categoryMap = {}
	var spotlightCategory = null
	var maxCategory = 0

	for (const order of ordersFromChannel) {
		for (const item of order.items) {
			if (categoryMap[item.CategoryId] == null) categoryMap[item.CategoryId] = 1
			else categoryMap[item.CategoryId]++

			if (categoryMap[item.CategoryId] > maxCategory) {
				spotlightCategory = item.CategoryName
				maxCategory = categoryMap[item.CategoryId]
			}
		}
	}

	return spotlightCategory
}

function getChannels() {
	return channels.map((channel) => ({
		...channel,
		spotlightProduct: getSpotlightProduct(channel),
		spotlightCategory: getSpotlightCategory(channel),
	}))
}

export default getChannels
