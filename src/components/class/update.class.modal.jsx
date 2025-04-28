import { Col, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd";
import { useEffect } from "react";
import { updateClassAPI, updateSubjectAPI } from "../../services/api.service";


const UpdateClassModal = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const [form] = Form.useForm()

    const { isUpdateFormOpen, setIsUpdateFormOpen, loadClass, setDataUpdate, dataUpdate, campusOptions, subjectOptions } = props

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldValue("name", dataUpdate.name)
            form.setFieldValue("teacher", dataUpdate.teacher.telephone)
            form.setFieldValue("subject", dataUpdate.subject.id)
            form.setFieldValue("campus", dataUpdate.campus.id)
        }
    }, [dataUpdate])

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

        const res = await updateClassAPI(values.id, values.name, subject, teacher, campus)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Cập nhật lớp học thành công')
            await loadClass()
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
                title="Cập nhật lớp học"
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
            </Modal>
        </>
    )
}

export default UpdateClassModal;