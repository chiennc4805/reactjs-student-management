// SearchBar.jsx - Reusable search component
import { useState, useEffect } from 'react';
import { Input, Button, Space, Form, Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const location = useLocation();

    const [form] = Form.useForm();

    const [searchConfig, setSearchConfig] = useState({
        field1: { label: 'Name', placeholder: 'nhập dữ liệu' },
        field2: { label: 'Address', placeholder: 'nhập dữ liệu' },
    });

    // Update search fields based on current route
    useEffect(() => {
        // Configure fields based on current path
        const path = location.pathname;

        if (path.includes('/students')) {
            setSearchConfig({
                field1: { label: 'Họ và tên', placeholder: 'nhập tên học sinh' },
                field2: { label: 'Class', placeholder: 'nhập lớp' },
            });
        } else if (path.includes('/parents')) {
            setSearchConfig({
                field1: { label: 'Parent Name', placeholder: 'nhập tên phụ huynh' },
                field2: { label: 'Phone', placeholder: 'nhập số điện thoại' },
            });
        } else if (path.includes('/classes')) {
            setSearchConfig({
                field1: { label: 'Class Name', placeholder: 'nhập tên lớp' },
                field2: { label: 'Grade', placeholder: 'nhập khối' },
            });
        }


        // Reset form when route changes
        form.resetFields();
    }, [location.pathname, form]);

    const onFinish = (values) => {
        console.log('Search values:', values);
        // Handle search logic here
    };

    return (
        <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
        >
            <div style={{ display: 'flex', gap: '20px' }}>
                <Form.Item label={searchConfig.field1.label} name={searchConfig.field1.name}>
                    <Input placeholder={searchConfig.field1.placeholder} style={{ width: 300 }} />
                </Form.Item>

                <Form.Item label={searchConfig.field2.label} name={searchConfig.field2.name}>
                    <Input placeholder={searchConfig.field2.placeholder} style={{ width: 300 }} />
                </Form.Item>
            </div>

            <div>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit">Tìm kiếm</Button>
                        <Button onClick={() => form.resetFields()}>Làm lại</Button>
                    </Space>
                </Form.Item>
            </div>
        </Form>
    );
};

export default SearchBar;