import React from 'react'
import { Form, Input, Button, Card, Alert } from 'antd'

import Navigation from '../components/navigation'

const Settings = () => (
	<Navigation section="settings">
		<Card style={{ maxWidth: 500 }}>
			<Form
				layout="vertical"
				initialValues={{
					account: 'apiexamples',
					environment: 'vtexcommercestable',
					token: '7b48da67-a3c6-493b-af6c-549cdaf12fc1',
				}}
			>
				<Form.Item>
					<Alert message="Tela protótipo" type="warning" />
				</Form.Item>
				<Form.Item label="Nome da Conta" name="account">
					<Input />
				</Form.Item>
				<Form.Item label="Ambiente" name="environment">
					<Input />
				</Form.Item>
				<Form.Item label="API Token" name="token">
					<Input.Password />
				</Form.Item>
				<Form.Item>
					<Button type="primary">Salvar</Button>
				</Form.Item>
			</Form>
		</Card>
	</Navigation>
)

export default Settings
