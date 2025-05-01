// SearchBar.jsx - Reusable search component
import { Button, Form, Input, Space } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchBar = (props) => {
    const location = useLocation();

    const [form] = Form.useForm();

    const { searchConfig, setSearchConfig } = props

    useEffect(() => {

        if (location.pathname.includes('/students')) {
            setSearchConfig({
                field1: { label: 'Họ và tên', name: 'name', placeholder: 'nhập dữ liệu' },
                field2: { label: 'Lớp học', name: "class", placeholder: 'nhập dữ liệu' },
            });
        } else if (location.pathname.includes('/parents')) {
            setSearchConfig({
                field1: { label: 'Parent Name', placeholder: 'nhập dữ liệu' },
                field2: { label: 'Phone', placeholder: 'nhập dữ liệu' },
            });
        } else if (location.pathname.includes('/classes')) {
            setSearchConfig({
                field1: { label: 'Class Name', placeholder: 'nhập dữ liệu' },
                field2: { label: 'Grade', placeholder: 'nhập dữ liệu' },
            });
        } else {
            setSearchConfig(null);
        }

        form.resetFields();
    }, [location.pathname, form]);

    const onFinish = (values) => {
        console.log('Search values:', values);
        // Handle search logic here
    };

    return (
        searchConfig &&
        <Form
            form={form}
            layout="inline"
            onFinish={onFinish}
            style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
        >
            <div style={{ display: 'flex', gap: '20px' }}>
                <Form.Item
                    label={searchConfig.field1.label}
                    name={searchConfig.field1.name}
                >
                    <Input
                        placeholder={searchConfig.field1.placeholder}
                        style={{ width: 300 }}
                    />
                </Form.Item>

                <Form.Item
                    label={searchConfig.field2.label}
                    name={searchConfig.field2.name}
                >
                    <Input
                        placeholder={searchConfig.field2.placeholder}
                        style={{ width: 300 }}
                    />
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