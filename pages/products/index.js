import React, { useState } from 'react'
import { Table, Select, Input } from 'antd'
import { SearchOutlined, BellOutlined } from '@ant-design/icons';

import Navigation from '../../components/navigation'

import products from '../../data/products.json'
import orders from '../../data/orders.json'
import channels from '../../data/channels.json'

const { Option } = Select;

const getStock = product => {
    return ""
}

const getInsights = product => {
    return ""
}

const getLastOrder = product => {
    const latestOrder = orders.find(order => order.items.find(orderProduct => orderProduct.RefId === product.RefId))
    let lastOrderString = "Nunca vendido"
    if (latestOrder) {
        const latestOrderDate = new Date(latestOrder.creationDate)
        const currentDate = new Date()
        const minutesAgo = (currentDate - latestOrderDate) / (60000)
        console.log(minutesAgo)
        if (minutesAgo < 60 && minutesAgo >= 0) {
            lastOrderString = `${Math.floor(minutesAgo)} minutos atrás`
        } else {
            const hoursAgo = minutesAgo / 60
            if (hoursAgo < 24 && hoursAgo >= 0) {
                lastOrderString = `${Math.floor(hoursAgo)} horas atrás`
            } else {
                lastOrderString = latestOrderDate.toLocaleDateString()
            }
        }
    }
    return lastOrderString
}

orders.sort((a, b) => new Date(b.creationDate) - new Date(a.creationDate))

products.forEach(product => {
    product.Stock = getStock(product)
    product.Insights = getInsights(product)
    product.LastOrder = getLastOrder(product)
    return product;
});

const columns = [
    {
        title: 'Nome',
        dataIndex: 'Name'
    },
    {
        title: 'Categoria',
        dataIndex: 'CategoryName'
    },
    {
        title: 'Estoque',
        dataIndex: 'Stock'
    },
    {
        title: 'Insights',
        dataIndex: 'Insights'
    },
    {
        title: 'Última venda',
        dataIndex: 'LastOrder'
    },
]

const Products = () => {
    const [filter, setFilter] = useState('')

    const searchOnChange = e => {
        const value = e.target.value && e.target.value.toLocaleLowerCase();
        setFilter(value);
    }

	return (
		<Navigation section='products'>
            <Input 
                prefix={<SearchOutlined style={{color: '#ced4d9'}}/>}
                placeholder="Pesquisar por um produto"
                size="large"
                allowClear
                onChange={searchOnChange} 
            />
            <Table dataSource={products.filter(row => !filter || row.Name.toLocaleLowerCase().includes(filter))} columns={columns} rowKey="Name" locale={{emptyText: "Não foram encontrados produtos com o nome informado."}} />
		</Navigation>
	)
}

export default Products
