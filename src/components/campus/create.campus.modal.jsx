import { Modal, Button, Form, Input, Row, Col, DatePicker, Select, notification } from "antd";
import locale from 'antd/es/date-picker/locale/vi_VN'
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { createCampusAPI, createStudentAPI } from "../../services/api.service";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const CampusForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

    const [isFormOpen, setIsFormOpen] = useState(false)

    const { loadCampus } = props

    const [form] = Form.useForm();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {
        const res = await createCampusAPI(values.name, values.address)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới thành công')
            await loadCampus()
            setIsFormOpen(false)
            form.resetFields()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }
    };

    return (
        <>
            {contextHolder}

            <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "20px 0px" }}>
                <h3>
                    Danh sách cơ sở
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
                title="Thêm mới cơ sở" open={isFormOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                    setIsFormOpen(false);
                    form.resetFields();
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

                        {/* row 1 */}
                        <Col xs={24} >
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

export default CampusForm;