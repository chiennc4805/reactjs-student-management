import { useState } from 'react'
import SideBar from './components/layout/sidebar'
import { Link, Outlet } from 'react-router-dom'
import {
	BugOutlined,
	DownOutlined,
	HomeOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ReadOutlined,
	ScheduleOutlined,
	TeamOutlined,
	UserOutlined,
	VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, Space, theme } from 'antd';
import React from 'react';
import SearchBar from './components/layout/search.bar';


function App() {

	const { Header, Sider, Content } = Layout;
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const siderStyle = {
		height: '100vh',
		position: 'sticky',
		insetInlineStart: 0,
		top: 0,
		bottom: 0,
		scrollbarWidth: 'thin',
		scrollbarGutter: 'stable',
		backgroundColor: "white"
	};

	const items = [
		{
			label: (
				<a href="https://www.antgroup.com" target="_blank" rel="noopener noreferrer">
					1st menu item
				</a>
			),
			key: '0',
		},
		{
			type: 'divider',
		},
		{
			label: '3rd menu item',
			key: '3',
		},
	];

	return (
		<>
			<Layout>
				<Sider trigger={null} collapsible collapsed={collapsed} style={siderStyle}>
					<div className="demo-logo-vertical" style={{ textAlign: "center", margin: "20px 0px" }}>
						<BugOutlined /> Logo
					</div>
					<Menu
						mode="inline"
						defaultSelectedKeys={['1']}
						items={[
							{
								label: <Link to="/students">Học sinh</Link>,
								icon: <UserOutlined />
							},
							{
								label: <Link to="/parents">Phụ huynh</Link>,
								icon: <UserOutlined />
							},
							{
								label: <Link to="/teachers">Giáo viên</Link>,
								icon: <UserOutlined />
							},
							{
								label: <Link to="/classes">Lớp học</Link>,
								icon: <TeamOutlined />
							},
							{
								label: <Link to="/subjects">Môn học</Link>,
								icon: <ReadOutlined />
							},
							{
								label: <Link to="/schedules">Lịch học</Link>,
								icon: <ScheduleOutlined />
							},
							{
								label: "Cơ sở",
								icon: <HomeOutlined />,
								children: [
									{
										label: <Link to="/campus">Thông tin</Link>,
									},
									{
										label: <Link to="/facilities">Thiết bị</Link>,
									},
								]
							},
						]}
					/>
				</Sider>
				<Layout>
					<Header style={{
						padding: 0,
						backgroundColor: "#f5f5f5",
						display: "flex",
						justifyContent: "space-between"
					}}>
						<Button
							type="text"
							icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
							onClick={() => setCollapsed(!collapsed)}
							style={{
								fontSize: '16px',
								width: 64,
								height: 64,
							}}
						/>
						<Dropdown menu={{ items }} trigger={['click']}>
							<div
								onClick={e => e.preventDefault()}
								style={{ margin: "0px 10px", cursor: "pointer" }}>
								Welcome
								<Avatar size="middle" icon={<UserOutlined />} style={{ margin: "0px 15px" }} />
							</div>
						</Dropdown>
					</Header>

					<Content style={{ margin: '24px 16px', overflow: 'initial' }}>
						<div style={{
							padding: "25px 30px",
							textAlign: 'center',
							margin: "0px 0px 20px 0px",
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}>
							<SearchBar />
						</div>

						<div
							style={{
								padding: "5px 10px",
								textAlign: 'center',
								background: colorBgContainer,
								borderRadius: borderRadiusLG,
							}}
						>
							<Outlet />
						</div>
					</Content>
				</Layout>
			</Layout>
		</>
	)
}

export default App;
