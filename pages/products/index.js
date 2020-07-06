import React, { useState } from 'react'
import { Table, Input, Avatar } from 'antd'
import Link from 'next/link'
import { SearchOutlined } from '@ant-design/icons';

import Navigation from '../../components/navigation'

const columns = [
    {
        title: '',
        dataIndex: 'Image',
        render: text => <Avatar src={text} size="large" shape="square" />,
        width: 50
    },
    {
        title: 'Nome',
        dataIndex: 'Name',
        render: (text, record) => <Link href='/products/[LinkId]' as={'/products/' + record.LinkId}><a>{text}</a></Link>
    },
    {
        title: 'Categoria',
        dataIndex: 'CategoryName'
    },
    {
        title: 'Código de Referência',
        dataIndex: 'RefId'
    },
    {
        title: 'Última venda',
        dataIndex: 'LastOrder'
    },
]

const Products = ({ products }) => {
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

import getProducts from '../../services/products'
export async function getStaticProps() {
    const products = getProducts()
	return { props: { products } }
}
