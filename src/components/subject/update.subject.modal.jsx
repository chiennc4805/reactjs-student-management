import { Col, DatePicker, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd";
import locale from 'antd/es/date-picker/locale/vi_VN'
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { updateStudentAPI, updateSubjectAPI } from "../../services/api.service";


const UpdateSubjectModal = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const [form] = Form.useForm()

    const { isUpdateFormOpen, setIsUpdateFormOpen, loadSubject, setDataUpdate, dataUpdate } = props

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldValue("id", dataUpdate.id)
            form.setFieldValue("name", dataUpdate.name)
            form.setFieldValue("pricePerDay", dataUpdate.pricePerDay)
            form.setFieldValue("salaryPerDay", dataUpdate.salaryPerDay)
        }
    }, [dataUpdate])

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {

        const res = await updateSubjectAPI(values.id, values.name, values.pricePerDay, values.salaryPerDay)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Cập nhật môn học thành công')
            await loadSubject()
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
                title="Cập nhật môn học"
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

export default UpdateSubjectModal;