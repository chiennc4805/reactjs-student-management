import { Col, DatePicker, Form, Input, Modal, notification, Row, Select } from "antd";
import locale from 'antd/es/date-picker/locale/vi_VN'
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { updateCampusAPI, updateStudentAPI } from "../../services/api.service";


const UpdateCampusModal = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const [form] = Form.useForm()

    const { isUpdateFormOpen, setIsUpdateFormOpen, loadCampus, setDataUpdate, dataUpdate } = props

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldValue("id", dataUpdate.id)
            form.setFieldValue("name", dataUpdate.name)
            form.setFieldValue("address", dataUpdate.address)
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

        const res = await updateCampusAPI(values.id, values.name, values.address)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Cập nhật cơ sở thành công')
            await loadCampus()
            setIsUpdateFormOpen(false)
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
                title="Cập nhật cơ sở"
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
                        <Col xs={24} >
                            <Form.Item
                                style={{ display: "none" }}
                                name="id"
                            >
                                <Input type="hidden" />
                            </Form.Item>

                            <Form.Item
                                label="Tên cơ sở"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng điền tên cơ sở !' }]}
                            >
                                <Input placeholder="Nhập tên cơ sở" />
                            </Form.Item>

                        </Col>

                        {/* row 2 */}
                        <Col xs={24} >
                            <Form.Item
                                label="Địa chỉ"
                                name="address"
                                rules={[{ required: true, message: 'Vui lòng điền địa chỉ !' }]}
                            >
                                <Input placeholder="Nhập địa chỉ" />
                            </Form.Item>
                        </Col>


                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateCampusModal;