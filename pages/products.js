import React, { useState } from 'react'
import { Table, Select, Input } from 'antd'
import { SearchOutlined, BellOutlined } from '@ant-design/icons';

import Navigation from '../components/navigation'

import dataSource from '../data/products.json'
import orders from '../data/orders.json'
import channels from '../data/channels.json'

const { Option } = Select;

const getChannels = product => {
    return "Lorem ipsum"
}

const getStock = product => {
    return "Lorem ipsum"
}

const getInsights = product => {
    return "Lorem ipsum"
}

const getLastOrder = product => {
    return "Lorem ipsum"
}

dataSource.map(product => {
    product.Channels = getChannels(product)
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
        title: 'Canais',
        dataIndex: 'Channels'
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
                placeholder="Search for a product"
                size="large"
                allowClear
                onChange={searchOnChange} 
            />
            <p> 
                Canal: 
                <Select defaultValue="All" style={{width: 140}} bordered={false}>
                    <Option key='All'>All</Option>
                    {channels.map(channel => (
                        <Option key={channel.Id}>{channel.Name}</Option>
                    ))}
                </Select>
            </p>
            <Table dataSource={dataSource.filter(row => !filter || row.Name.toLocaleLowerCase().includes(filter))} columns={columns} rowKey="Name" />
		</Navigation>
	)
}

export default Products
