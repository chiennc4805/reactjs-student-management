import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

const Sidebar = () => {

    const items = [
        {
            label: <Link to="/students">Student</Link>,
            icon: <MailOutlined />,
        },
        {
            label: <Link to="/schedules">Schedule</Link>,
            icon: <MailOutlined />,
        },
    ];

    return (
        <>

            <Menu
                style={{
                    height: "100vh",
                    width: "18vw",
                    // position: "fixed"
                }}
                mode="inline"
                items={items}
            />

        </>
    );

}

export default Sidebar;