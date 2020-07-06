import orders from '../data/orders.json'
import templates from '../data/insights.json'
import channels from '../data/channels.json'
import products from '../data/products.json'

const getInsights = () => {
    let insights = [];
    for (let i = 0; i < templates.length; i++) {
        let order = orders[i]
        let template = templates[i]
        let item
        if (template.type == "product"){
            item = orders[i].items[0].Name
        } else if (template.type == "channel") {
            item = channels[i%channels.length].Name
        } else {
            item = orders[i].paymentNames
        }

        let message = template.message.replace('__', item)
        message = message.replace('**', Math.random()*70|0)
        let insight = Object.assign({...itemplate}, {message})
        insights.push(insight)
    }
    return insights
}

export default getInsights;