import {
	BugOutlined,
	HomeOutlined,
	MenuFoldOutlined,
	MenuUnfoldOutlined,
	ReadOutlined,
	ScheduleOutlined,
	TeamOutlined,
	UserOutlined
} from '@ant-design/icons';
import { Avatar, Button, Dropdown, Layout, Menu, theme } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from './components/context/auth.context';
import SearchBar from './components/layout/search.bar';
import { getAccountAPI, logoutAPI } from './services/api.service';


function App() {
	const { Header, Sider, Content } = Layout;
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const { user, setUser } = useContext(AuthContext)

	const [searchConfig, setSearchConfig] = useState(null);

	useEffect(() => {
		fetchUserInfo()
	}, [])

	const fetchUserInfo = async () => {
		const res = await getAccountAPI()
		if (res.data) {
			setUser(res.data.user)
		}
	}

	const handleLogout = async (mess) => {
		const res = await logoutAPI()
		if (res.data) {
			//clear data
			localStorage.removeItem("access_token")
			setUser({
				id: "",
				name: "",
				role: ""
			})
			if (mess) {
				message.success("Đăng xuất thành công.")
			}

			//redirect to home
			navigate("/")
		}
	}

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
			label: <a onClick={() => handleLogout(true)}>Đăng xuất</a>,
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
						items={[
							{
								key: "1",
								label: <Link to="/students">Học sinh</Link>,
								icon: <UserOutlined />
							},
							{
								key: "2",
								label: <Link to="/parents">Phụ huynh</Link>,
								icon: <UserOutlined />
							},
							{
								key: "3",
								label: <Link to="/teachers">Giáo viên</Link>,
								icon: <UserOutlined />
							},
							{
								key: "4",
								label: <Link to="/classes">Lớp học</Link>,
								icon: <TeamOutlined />
							},
							{
								key: "5",
								label: <Link to="/subjects">Môn học</Link>,
								icon: <ReadOutlined />
							},
							{
								key: "6",
								label: <Link to="/schedules">Lịch học</Link>,
								icon: <ScheduleOutlined />
							},
							{
								key: "7",
								label: "Cơ sở",
								icon: <HomeOutlined />,
								children: [
									{
										label: <Link to="/campus">Thông tin</Link>
									},
									{
										label: <Link to="/facilities">Thiết bị</Link>
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
						{user && user.id ?
							<Dropdown menu={{ items }} trigger={['click']}>
								<div
									onClick={e => e.preventDefault()}
									style={{ margin: "0px 10px", cursor: "pointer" }}>
									Welcome {user.name}
									<Avatar size="middle" icon={<UserOutlined />} style={{ margin: "0px 15px" }} />
								</div>
							</Dropdown>
							:
							<>
								<Link to="/login" style={{ margin: "0px 50px" }}>Đăng nhập</Link>
							</>
						}
					</Header>

					<Content style={{ margin: '24px 16px', overflow: 'initial' }}>
						<div style={{
							padding: "25px 30px",
							textAlign: 'center',
							margin: "0px 0px 20px 0px",
							background: colorBgContainer,
							borderRadius: borderRadiusLG,
						}}>
							<SearchBar
								searchConfig={searchConfig}
								setSearchConfig={setSearchConfig}
							/>
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
