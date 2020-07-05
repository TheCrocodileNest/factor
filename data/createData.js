const { writeFileSync } = require('fs')
const { v4: uuid } = require('uuid')

if (process.argv.length !== 4) {
	console.log('node data/createData $start $end')
	return
}

const products = require('./products.json')
const channels = require('./channels.json')

function random(min, max) {
	return min + Math.floor(Math.random() * (max - min + 1))
}
function pick(list) {
	return list[random(0, list.length - 1)]
}
function randomItems(maxItems = 4) {
	return new Array(random(1, maxItems)).fill(0).map(() => pick(products))
}
function randomChannel() {
	let channel = pick(channels)
	if (Math.random() < channel.repick) channel = pick(channels)
	const { Name, Payments } = channel
	return {
		Name,
		Payment: pick(Payments),
	}
}
function randomOrders(creationDate, ordersDaily = [10, 20]) {
	return new Array(random(...ordersDaily)).fill(0).map(() => {
		const items = randomItems()
		const channel = randomChannel()
		return {
			id: uuid(),
			creationDate,
			items,
			salesChannel: channel.Name,
			paymentNames: channel.Payment,
			totalItems: items.length,
			totalValue: items.reduce((acc, { Price }) => acc + Price, 0),
		}
	})
}

const start = new Date(process.argv[2])
const end = new Date(process.argv[3])

let orders = []
for (let day = start; day <= end; day.setDate(day.getDate() + 1)) {
	orders = [...orders, ...randomOrders(new Date(day))]
}

writeFileSync('data/orders.json', JSON.stringify(orders, null, 2))
