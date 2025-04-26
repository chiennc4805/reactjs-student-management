import { Col, DatePicker, Form, Input, Modal, notification, Row, Select } from "antd";
import locale from 'antd/es/date-picker/locale/vi_VN'
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { updateStudentAPI } from "../../services/api.service";


const UpdateStudentModal = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const [form] = Form.useForm()

    const { isUpdateFormOpen, setIsUpdateFormOpen, loadStudent, setDataUpdate, dataUpdate } = props

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldValue("id", dataUpdate.id)
            form.setFieldValue("name", dataUpdate.name)
            form.setFieldValue("gender", dataUpdate.gender === true ? "Nam" : "Nữ")
            const birthDate = dayjs(dataUpdate.birthDate)
            form.setFieldValue("birthDate", birthDate)
            form.setFieldValue("name", dataUpdate.name)
            form.setFieldValue("parentId", dataUpdate.parent?.id)
        }
    }, [dataUpdate])

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {
        dayjs.extend(customParseFormat)
        const birthDate = dayjs(values.birthDate).format('YYYY-MM-DD')
        const gender = values.gender === "1" ? true : false

        const res = await updateStudentAPI(values.id, values.name, gender, birthDate)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Cập nhật học sinh thành công')
            await loadStudent()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }
        setIsUpdateFormOpen(false)
    };

    const reloadAndCloseModal = () => {
        setIsUpdateFormOpen(false)
        setDataUpdate(null)
    }

    return (
        <>
            {contextHolder}

            <Modal
                title="Cập nhật học sinh"
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
                        <Col xs={24}>
                            <h4 style={{ margin: "0px 0px 20px 0px" }}>
                                Thông tin học sinh
                            </h4>
                        </Col>

                        {/* row 1  học sinh */}
                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>

                            <Form.Item
                                style={{ display: "none" }}
                                name="id"
                            >
                                <Input type="hidden" />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="Họ và tên"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                                <Input placeholder="Nhập tên" />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                name="class"
                                label="Lớp học"
                            >
                                <Select mode="multiple" placeholder="Chọn lớp học">
                                    <Option value="red">Red</Option>
                                    <Option value="green">Green</Option>
                                    <Option value="blue">Blue</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        {/* row 2 học sinh */}
                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <Form.Item style={{ width: "25%" }}
                                label="Giới tính"
                                name="gender"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                            >
                                <Select placeholder="Chọn giới tính">
                                    <Option value="1">Nam</Option>
                                    <Option value="0">Nữ</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item style={{ width: "20%" }}
                                label="Ngày sinh"
                                name="birthDate"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                            >
                                <DatePicker locale={locale} />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="ID phụ huynh"
                                name="parentId"
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <h4 style={{ margin: "0px 0px 20px 0px" }}>Thông tin phụ huynh</h4>
                        </Col>

                        {/* row 1  phụ huynh */}
                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <Form.Item style={{ width: "32%" }}
                                label="Họ và tên"
                                name="parentName"
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item style={{ width: "32%" }}
                                label="Số điện thoại"
                                name="parentTelephone"
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item style={{ width: "32%" }}
                                label="Địa chỉ"
                                name="parentAddress"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>

                        {/* row 2  phụ huynh */}
                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <Form.Item style={{ width: "23%" }}
                                label="Giới tính"
                                name="parentGender"
                            >
                                <Input disabled />
                            </Form.Item >

                            <Form.Item style={{ width: "23%" }}
                                label="Ngày sinh"
                                name="parentBirthDate"
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item style={{ width: "23%" }}
                                label="Tên Zalo"
                                name="zaloName"
                            >
                                <Input disabled />
                            </Form.Item>

                            <Form.Item style={{ width: "23%" }}
                                label="Tên Facebook"
                                name="facebookName"
                            >
                                <Input disabled />
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateStudentModal;