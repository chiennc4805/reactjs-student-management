import { Modal, Button, Form, Input, Row, Col, notification, InputNumber } from "antd";
import { createStudentAPI, createSubjectAPI } from "../../services/api.service";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const SubjectForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

    const [isFormOpen, setIsFormOpen] = useState(false)

    const { loadSubject } = props

    const [form] = Form.useForm();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {
        const res = await createSubjectAPI(values.name, values.pricePerDay, values.salaryPerDay)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới môn học thành công')
            await loadSubject()
            setIsFormOpen(false)
            form.resetFields()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }

    };

    const formatterNumber = (val) => {
        if (!val) return "0";
        return Number(val).toLocaleString("en-US");
    };

    return (
        <>
            {contextHolder}

            <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "20px 0px" }}>
                <h3>
                    Danh sách môn học
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
                title="Thêm mới môn học" open={isFormOpen}
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
                            <Form.Item style={{ width: "40%" }}
                                label="Tên môn học"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng điền tên môn học !' }]}
                            >
                                <Input placeholder="Nhập tên môn học" />
                            </Form.Item>

                            <Form.Item style={{ width: "28%" }}
                                label="Giá tiền / buổi"
                                name="pricePerDay"
                                rules={[{ required: true, message: 'Vui lòng điền giá tiền / buổi !' }]}
                            >
                                <InputNumber
                                    addonBefore="+"
                                    addonAfter="đ"
                                    defaultValue={""}
                                    formatter={(value) => formatterNumber(value)}
                                />
                            </Form.Item>

                            <Form.Item style={{ width: "28%" }}
                                label="Tiền lương / buổi"
                                name="salaryPerDay"
                                rules={[{ required: true, message: 'Vui lòng điền tiền lương / buổi !' }]}
                            >
                                <InputNumber
                                    addonBefore="+"
                                    addonAfter="đ"
                                    defaultValue={""}
                                    formatter={(value) => formatterNumber(value)}
                                />
                            </Form.Item>
                        </Col>

                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default SubjectForm;