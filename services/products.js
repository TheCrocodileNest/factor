import products from '../data/products.json'
import orders from '../data/orders.json'

function getLastOrder(product) {
    const latestOrder = orders.find(order => order.items.find(orderProduct => orderProduct.LinkId === product.LinkId))
    let lastOrderString = "Nunca vendido"
    if (latestOrder) {
        const latestOrderDate = new Date(latestOrder.creationDate)
        const currentDate = new Date()
        const minutesAgo = (currentDate - latestOrderDate) / (60000)
        if (minutesAgo < 60 && minutesAgo >= 0) {
            lastOrderString = `${Math.floor(minutesAgo)} minutos atrás`
        } else {
            const hoursAgo = minutesAgo / 60
            if (hoursAgo < 24 && hoursAgo >= 0) {
                lastOrderString = `${Math.floor(hoursAgo)} horas atrás`
            } else {
                const day = latestOrderDate.getDate() > 9 ? latestOrderDate.getDate() : '0' + latestOrderDate.getDate();
                const month = latestOrderDate.getMonth() > 8 ? latestOrderDate.getMonth() + 1 : '0' + (latestOrderDate.getMonth() + 1);
                const year = latestOrderDate.getFullYear();
                lastOrderString = `${day}/${month}/${year}`
            }
        }
    }
    return lastOrderString
}

function getProducts() {
    orders.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))

    products.forEach(product => {
        product.LastOrder = getLastOrder(product)
        return product
    })

    return products
}

export function getProduct(LinkId) {
    const products = getProducts()
    return products.find(product => product.LinkId === LinkId)
}

export default getProducts
