import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Modal, notification, Row, Select } from "antd";
import { useState } from "react";
import { createClassAPI } from "../../services/api.service";

const ClassForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

    const [isFormOpen, setIsFormOpen] = useState(false)

    const { loadClass, campusOptions, subjectOptions } = props

    const [form] = Form.useForm();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {
        const subject = { id: values.subject }
        const teacher = { telephone: values.teacher }
        const campus = { id: values.campus }

        const res = await createClassAPI(values.name, subject, teacher, campus)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới lớp học thành công')
            await loadClass()
            setIsFormOpen(false)
            form.resetFields()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message).includes("điện thoại") ? "Số điện thoại giáo viên không tồn tại, vui lòng vào mục giáo viên để kiểm tra!" : JSON.stringify(res.message))
        }

    };

    return (
        <>
            {contextHolder}

            <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%" }}>
                <h3>
                    Danh sách lớp học
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
                title="Thêm mới lớp học" open={isFormOpen}
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
                                label="Tên lớp học"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng điền tên lớp học !' }]}
                            >
                                <Input placeholder="Nhập tên lớp học" />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="Dạy môn"
                                name="subject"
                                rules={[{ required: true, message: 'Vui lòng chọn môn dạy học !' }]}
                            >
                                <Select
                                    placeholder="Chọn môn dạy học"
                                    allowClear={true}
                                    options={subjectOptions}
                                >

                                </Select>
                            </Form.Item>
                        </Col>

                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <Form.Item style={{ width: "48%" }}
                                label="Số điện thoại giáo viên"
                                name="teacher"
                                rules={[{ required: true, message: 'Vui lòng điền số điện thoại của giáo viên !' }]}
                            >
                                <Input placeholder="Nhập số điện thoại của giáo viên" />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="Cơ sở"
                                name="campus"
                                rules={[{ required: true, message: 'Vui lòng chọn cơ sở dạy học !' }]}
                            >
                                <Select
                                    placeholder="Chọn cơ sở dạy học"
                                    allowClear={true}
                                    options={campusOptions}
                                >

                                </Select>
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal >
        </>
    )
}

export default ClassForm;