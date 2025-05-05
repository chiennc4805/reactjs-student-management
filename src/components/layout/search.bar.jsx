// SearchBar.jsx - Reusable search component
import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, Space } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { assignSearchValue, resetValue } from '../../redux/slice/searchSlice';

const SearchBar = (props) => {
    const location = useLocation();

    const [form] = Form.useForm();

    const [searchConfig, setSearchConfig] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        if (location.pathname.includes('/student')) {
            setSearchConfig({
                field1: { label: 'Tên', name: 'name', placeholder: 'nhập dữ liệu' },
            });
        } else if (location.pathname.includes('/parent')) {
            setSearchConfig({
                field1: { label: 'Tên', name: 'name', placeholder: 'nhập dữ liệu' },
                field2: { label: 'Số điện thoại', name: 'telephone', placeholder: 'nhập dữ liệu' },
            });
        } else if (location.pathname.includes('/teacher')) {
            setSearchConfig({
                field1: { label: 'Tên', name: 'name', placeholder: 'nhập dữ liệu' },
                field2: { label: 'Số điện thoại', name: 'telephone', placeholder: 'nhập dữ liệu' },
                field3: { label: 'Chuyên môn', name: 'subject', placeholder: 'nhập dữ liệu' },
            });
        } else if (location.pathname.includes('/subject')) {
            setSearchConfig({
                field1: { label: 'Tên', name: 'name', placeholder: 'nhập dữ liệu' },
            });
        } else if (location.pathname.includes('/class')) {
            setSearchConfig({
                field1: { label: 'Class Name', placeholder: 'nhập dữ liệu' },
            });
        } else {
            setSearchConfig(null);
        }

        resetFormAndStateValue()
    }, [location.pathname, form]);

    const resetFormAndStateValue = () => {
        form.resetFields();
        dispatch(resetValue())
    }

    const onFinish = (values) => {
        console.log('Search values:', values);
        if (location.pathname.includes('/student')) {
            if (values.name) {
                dispatch(assignSearchValue({ student: `name~'${values.name}'` }))
            }

        } else if (location.pathname.includes('/parent')) {
            if (values.name && values.telephone) {
                dispatch(assignSearchValue({ parent: `name~'${values.name}' and telephone~'${values.telephone}'` }))
            }
            else if (values.name) {
                dispatch(assignSearchValue({ parent: `name~'${values.name}'` }))
            }
            else if (values.telephone) {
                dispatch(assignSearchValue({ parent: `telephone~'${values.telephone}'` }))
            }

        }
        // else if (location.pathname.includes('/teacher')) {
        //     if (values.name && values.telephone && values.subject) {
        //         dispatch(assignSearchValue({ teacher: `name~'${values.name}' and telephone~'${values.telephone}'` }))
        //     }
        //     else if (values.name) {
        //         dispatch(assignSearchValue({ teacher: `name~'${values.name}'` }))
        //     }
        //     else if (values.telephone) {
        //         dispatch(assignSearchValue({ teacher: `telephone~'${values.telephone}'` }))
        //     }
        // } 
        else if (location.pathname.includes('/subject')) {
            if (values.name) {
                dispatch(assignSearchValue({ subject: `name~'${values.name}'` }))
            }

        }
        // else if (location.pathname.includes('/class')) {
        //     setSearchConfig({
        //         field1: { label: 'Class Name', placeholder: 'nhập dữ liệu' },
        //     });
        // } 
        else {
            setSearchConfig(null);
        }
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
                {searchConfig.field1 && (
                    <Form.Item
                        label={searchConfig.field1.label}
                        name={searchConfig.field1.name}
                    >
                        <Input
                            placeholder={searchConfig.field1.placeholder}
                            style={{ width: "15vw" }}
                        />
                    </Form.Item>
                )}

                {searchConfig.field2 && (
                    <Form.Item
                        label={searchConfig.field2.label}
                        name={searchConfig.field2.name}
                    >
                        <Input
                            placeholder={searchConfig.field2.placeholder}
                            style={{ width: "15vw" }}
                        />
                    </Form.Item>
                )}

                {searchConfig.field3 && (
                    <Form.Item
                        label={searchConfig.field3.label}
                        name={searchConfig.field3.name}
                    >
                        <Input
                            placeholder={searchConfig.field3.placeholder}
                            style={{ width: "15vw" }}
                        />
                    </Form.Item>
                )}

            </div>

            <div>
                <Form.Item>
                    <Space>
                        <Button type="primary" htmlType="submit" icon={<SearchOutlined />} iconPosition='end' >Tìm kiếm</Button>
                        <Button onClick={resetFormAndStateValue}>Làm lại</Button>
                    </Space>
                </Form.Item>
            </div>
        </Form>

    );
};

export default SearchBar;