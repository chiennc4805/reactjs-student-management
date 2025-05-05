import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, notification, Row, Select } from "antd";
import { useState } from "react";
import { createUserAPI } from "../../services/api.service";

const UserForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

    const [isFormOpen, setIsFormOpen] = useState(false)

    const { loadUser, roleOptions } = props

    const [form] = Form.useForm();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {
        const res = await createUserAPI(values.name, values.username, values.password, { id: values.role })
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới tài khoản thành công')
            await loadUser()
            setIsFormOpen(false)
            form.resetFields()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }

    };

    return (
        <>
            {contextHolder}

            <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%" }}>
                <h3>
                    Danh sách tài khoản
                </h3>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsFormOpen(true)}
                >
                    Thêm mới
                </Button>
            </div>

            <Modal
                title="Thêm mới tài khoản" open={isFormOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                    setIsFormOpen(false);
                    form.resetFields()
                }
                }
                okText="Thêm mới"
                cancelText="Huỷ"
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                        <CancelBtn />
                    </>
                )}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
                maskClosable={false}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Row justify={"center"} style={{ marginTop: "20px" }}>

                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <Form.Item style={{ width: "48%" }}
                                label="Tên người dùng"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng điền tên người dùng !' }]}
                            >
                                <Input placeholder="Nhập tên tài khoản" />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="Vai trò"
                                name="role"
                                rules={[{ required: true, message: 'Vui lòng điền giá tiền / buổi !' }]}
                            >
                                <Select
                                    allowClear={true}
                                    placeholder={"Chọn vai trò"}
                                    options={roleOptions}
                                />
                            </Form.Item>

                        </Col>

                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <Form.Item style={{ width: "48%" }}
                                label="Tài khoản"
                                name="username"
                                rules={[{ required: true, message: 'Vui lòng điền tên người dùng !' }]}
                            >
                                <Input placeholder="Nhập tên tài khoản" />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="Mật khẩu"
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng điền giá tiền / buổi !' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default UserForm;