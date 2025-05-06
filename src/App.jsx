import {
	BankOutlined,
	BugOutlined,
	ExceptionOutlined,
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
import { fetchAllCampusWithoutPaginationAPI, fetchAllClassesWithoutPaginationAPI, getAccountAPI, logoutAPI } from './services/api.service';


function App() {
	const { Header, Sider, Content } = Layout;
	const [collapsed, setCollapsed] = useState(false);
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const { user, setUser } = useContext(AuthContext)

	const [scheduleMenuItems, setScheduleMenuItems] = useState([]);

	useEffect(() => {
		fetchUserInfo()
		fetchScheduleMenuItems()
	}, [])

	const fetchUserInfo = async () => {
		const res = await getAccountAPI()
		if (res.data) {
			setUser(res.data.user)
		}
	}

	const fetchScheduleMenuItems = async () => {
		const resCampusAPI = await fetchAllCampusWithoutPaginationAPI();
		if (resCampusAPI.data && Array.isArray(resCampusAPI.data.result)) {
			const campusItems = await Promise.all(
				resCampusAPI.data.result.map(async (campusItem) => {
					const resClassMenuItemsOfCampus = await fetchAllClassesWithoutPaginationAPI(`campus.name~'${campusItem.name}'`);
					const classItems = resClassMenuItemsOfCampus.data && Array.isArray(resClassMenuItemsOfCampus.data.result)
						? resClassMenuItemsOfCampus.data.result.map((item) => ({
							key: `class${item.id}`,
							label: <Link to={`/schedule/${item.name}`}>{item.name}</Link>,
						}))
						: [];
					return {
						key: `campus${campusItem.id}`,
						label: campusItem.name,
						children: classItems,
					};
				})
			);
			setScheduleMenuItems(campusItems);
		}
	};

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
						style={{
							height: 'calc(100vh - 60px)',
							overflowY: "auto",
							scrollbarWidth: "thin"
						}}
						items={[
							{
								key: "person",
								label: "Nhân sự",
								icon: <UserOutlined />,
								children: [
									{
										key: "person1",
										label: <Link to="/student">Học sinh</Link>
									},
									{
										key: "person2",
										label: <Link to="/parent">Phụ huynh</Link>
									},
									{
										key: "person3",
										label: <Link to="/teacher">Giáo viên</Link>
									},
								]
							},
							{
								key: "subject",
								label: <Link to="/subject">Môn học</Link>,
								icon: <ReadOutlined />
							},
							{
								key: "class",
								label: <Link to="/class">Lớp học</Link>,
								icon: <BankOutlined />
							},
							{
								key: "schedule",
								label: "Lịch học",
								icon: <ScheduleOutlined />,
								children: scheduleMenuItems
							},
							{
								key: "campus",
								label: "Cơ sở",
								icon: <HomeOutlined />,
								children: [
									{
										label: <Link to="/campus">Thông tin</Link>
									},
									{
										label: <Link to="/facility">Thiết bị</Link>
									},
								]
							},
							{
								key: "user",
								label: <Link to="/user">Tài khoản</Link>,
								icon: <TeamOutlined />
							},
							{
								key: "role",
								label: <Link to="/role">Vai trò</Link>,
								icon: <ExceptionOutlined />
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
