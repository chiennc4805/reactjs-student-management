import { Col, Form, Input, Modal, notification, Row, Select } from "antd";
import { useEffect } from "react";
import { updateUserAPI } from "../../services/api.service";


const UpdateUserModal = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const [form] = Form.useForm()

    const { isUpdateFormOpen, setIsUpdateFormOpen, loadUser, setDataUpdate, dataUpdate, roleOptions } = props

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldValue("id", dataUpdate.id)
            form.setFieldValue("name", dataUpdate.name)
            form.setFieldValue("username", dataUpdate.username)
            form.setFieldValue("role", dataUpdate.role.id)
        }
    }, [dataUpdate])

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {

        const res = await updateUserAPI(values.id, values.name, { id: values.role })
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Cập nhật tài khoản thành công')
            await loadUser()
            reloadAndCloseModal()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }
    };

    const reloadAndCloseModal = () => {
        setIsUpdateFormOpen(false)
        setDataUpdate(null)
    }

    const formatterNumber = (val) => {
        if (!val) return "0";
        return Number(val).toLocaleString("en-US");
    };

    return (
        <>
            {contextHolder}

            <Modal
                title="Cập nhật tài khoản"
                open={isUpdateFormOpen}
                onOk={() => form.submit()}
                onCancel={() => reloadAndCloseModal()}
                okText="Cập nhật"
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
                            <Form.Item
                                style={{ display: "none" }}
                                name="id"
                            >
                                <Input type="hidden" />
                            </Form.Item>

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

                        {/* <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <Form.Item style={{ width: "48%" }}
                                label="Tài khoản"
                                name="username"
                                rules={[{ required: true, message: 'Vui lòng điền tên người dùng !' }]}
                            >
                                <Input placeholder="Nhập tên tài khoản" />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="Mật khẩu mới"
                                name="password"
                                rules={[{ required: true, message: 'Vui lòng điền giá tiền / buổi !' }]}
                            >
                                <Input.Password />
                            </Form.Item>

                        </Col> */}
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateUserModal;