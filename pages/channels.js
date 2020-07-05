import { Card } from 'antd';
import channels from '../data/channels.json'
import orders from '../data/orders.json'

import Navigation from '../components/navigation'

function getDetachProduct(channelName){
  const ordersFromChannel = orders.filter((order) => {return order.salesChannel == channelName});
  if (ordersFromChannel.length == 0)
    return "Nenhum";

  var productMap = {};
  var detachProduct = null;
  var maxProducts = 0;

  for (const order of ordersFromChannel) {
    for (const item of order.items) {
      if (productMap[item.Name] == null)
        productMap[item.Name] = 1;
      else
        productMap[item.Name]++;

      if (productMap[item.Name] > maxProducts) {
        detachProduct = item.Name;
        maxProducts = productMap[item.Name];
      }
    }
  }

  return detachProduct;
}

function getDetachCategory(channelName){
  const ordersFromChannel = orders.filter((order) => {return order.salesChannel == channelName});
  if (ordersFromChannel.length == 0)
    return "Nenhum";

  var categoryMap = {};
  var detachCategory = null;
  var maxCategory = 0;

  for (const order of ordersFromChannel) {
    for (const item of order.items) {
      if (categoryMap[item.CategoryId] == null)
        categoryMap[item.CategoryId] = 1;
      else
        categoryMap[item.CategoryId]++;

      if (categoryMap[item.CategoryId] > maxCategory) {
        detachCategory = item.CategoryName;
        maxCategory = categoryMap[item.CategoryId];
      }
    }
  }

  return detachCategory;
}

export default function Channels() {
  return (
		<Navigation section="channels">
      {channels.map((channel) => (
        <Card title={ channel.Name }>
          <div>
            <h4>Produto em Destaque</h4>
            <div>{ getDetachProduct(channel.Name) }</div>
          </div>
          <div>
            <h4>Categoria em Destaque</h4>
            <div>{ getDetachCategory(channel.Name) }</div>
          </div>
        </Card>
      ))}
    </Navigation>
  )
}