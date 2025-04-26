import { Col, DatePicker, Form, Input, InputNumber, Modal, notification, Row, Select } from "antd";
import locale from 'antd/es/date-picker/locale/vi_VN'
import { useEffect, useState } from "react";
import { updateStudentAPI, updateSubjectAPI, updateTeacherAPI } from "../../services/api.service";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'


const UpdateTeacherModal = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const [form] = Form.useForm()

    const { isUpdateFormOpen, setIsUpdateFormOpen, loadTeacher, setDataUpdate, dataUpdate, subjectOptions } = props

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldValue("id", dataUpdate.id)
            form.setFieldValue("name", dataUpdate.name)
            form.setFieldValue("gender", dataUpdate.gender === true ? "Nam" : "Nữ")

            const birthDate = dayjs(dataUpdate.birthDate)
            form.setFieldValue("birthDate", birthDate)

            const subjects = dataUpdate.subjects.map(x => x.id)

            form.setFieldValue("telephone", dataUpdate.telephone)
            form.setFieldValue("address", dataUpdate.address)
            form.setFieldValue("zaloName", dataUpdate.zaloName)
            form.setFieldValue("facebookName", dataUpdate.facebookName)
            form.setFieldValue("subjects", subjects)
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
        const subjects = values.subjects.map(x => ({ id: x }))

        const res = await updateTeacherAPI
            (values.id, values.name, gender, birthDate, values.telephone, values.address, values.zaloName, values.facebookName, subjects)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Cập nhật giáo viên thành công')
            await loadTeacher()
            reloadAndCloseModal()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }
    };

    const reloadAndCloseModal = () => {
        setIsUpdateFormOpen(false)
        setDataUpdate(null)
    }

    return (
        <>
            {contextHolder}

            <Modal
                title="Cập nhật giáo viên"
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

                        {/* row 1 */}
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
                                rules={[{ required: true, message: 'Vui lòng điền họ và tên !' }]}
                            >
                                <Input placeholder="Nhập họ và tên" />
                            </Form.Item>



                            <Form.Item style={{ width: "48%" }}
                                label="Số điện thoại"
                                name="telephone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng điền số điện thoại !'
                                    },
                                    {
                                        pattern: /0[0-9]{9}/,
                                        message: 'Vui lòng điền số điện thoại hợp lệ',
                                    }
                                ]}
                            >
                                <Input placeholder="Nhập số điện thoại" />
                            </Form.Item>
                        </Col>

                        {/* row 2 */}
                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <Form.Item style={{ width: "25%" }}
                                label="Giới tính"
                                name="gender"
                                rules={[{ required: true, message: 'Vui lòng chọn giới tính !' }]}
                            >
                                <Select
                                    placeholder="Chọn giới tính"
                                    allowClear={true}
                                >
                                    <Option value="1">Nam</Option>
                                    <Option value="0">Nữ</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item style={{ width: "23%" }}
                                label="Ngày sinh"
                                name="birthDate"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh !' }]}
                            >
                                <DatePicker locale={locale} />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng điền địa chỉ !' }]}
                            >
                                <Input placeholder="Nhập địa chỉ" />
                            </Form.Item>
                        </Col>

                        {/* row 3 */}
                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <Form.Item style={{ width: "48%" }}
                                label="Tên zalo"
                                name="zaloName"
                                rules={[{ required: true, message: 'Vui lòng điền tên zalo !' }]}
                            >
                                <Input placeholder="Nhập tên zalo" />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="Tên facebook"
                                name="facebookName"
                                rules={[{ required: true, message: 'Vui lòng điền tên facebook !' }]}
                            >
                                <Input placeholder="Nhập tên facebook" />
                            </Form.Item>


                        </Col>

                        {/* row 4 */}
                        <Col xs={24} >
                            <Form.Item
                                label="Kĩ năng"
                                name="subjects"
                                rules={[{ required: true, message: 'Vui lòng chọn kĩ năng!' }]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Chọn môn dạy học"
                                    allowClear={true}
                                    options={subjectOptions}
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

export default UpdateTeacherModal;