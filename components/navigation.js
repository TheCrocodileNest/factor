import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout, Menu } from 'antd'
import {
	ExperimentOutlined,
	DashboardOutlined,
	ShopOutlined,
	TagsOutlined,
	SettingOutlined,
} from '@ant-design/icons'

const Logo = () => (
	<div
		style={{
			color: '#109cf1',
			fontSize: '2em',
			fontWeight: 600,
			letterSpacing: 3,
			padding: 16,
		}}
	>
		Factor
	</div>
)

const Navigation = ({ section, children }) => (
	<>
		<Head>
			<title>Factor</title>
		</Head>
		<Layout>
			<Layout.Sider theme="light">
				<Logo />
				<Menu mode="inline" selectedKeys={[section]}>
					<Menu.Item key="dashboard" icon={<DashboardOutlined />}>
						<Link href="/">Painel</Link>
					</Menu.Item>
					<Menu.Item key="products" icon={<TagsOutlined />}>
						<Link href="/products">Produtos</Link>
					</Menu.Item>
					<Menu.Item key="channels" icon={<ShopOutlined />}>
						<Link href="/channels">Canais</Link>
					</Menu.Item>
					<Menu.Item key="insights" icon={<ExperimentOutlined />}>
						<Link href="/insights">Insights</Link>
					</Menu.Item>
					<Menu.Divider />
					<Menu.Item key="settings" icon={<SettingOutlined />}>
						<Link href="/settings">Configurações</Link>
					</Menu.Item>
				</Menu>
			</Layout.Sider>
			<Layout.Content style={{ padding: 16 }}>{children}</Layout.Content>
		</Layout>
	</>
)

export default Navigation
