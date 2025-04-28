import { Modal, Button, Form, Input, Row, Col, DatePicker, Select, notification } from "antd";
import locale from 'antd/es/date-picker/locale/vi_VN'
import vi_VN from 'antd/locale/vi_VN';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat'
import { createStudentAPI } from "../../services/api.service";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

const StudentForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

    const [isFormOpen, setIsFormOpen] = useState(false)

    const { loadStudent, classOptions } = props

    const [form] = Form.useForm();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    // useEffect(() => {

    // }, [])

    const onFinish = async (values) => {
        dayjs.extend(customParseFormat)
        const birthDate = dayjs(values.birthDate).format('YYYY-MM-DD')
        const gender = values.gender === "1" ? true : false

        const res = await createStudentAPI(values.name, gender, birthDate)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới học sinh thành công')
            await loadStudent()
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
                    Danh sách học sinh
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
                title="Thêm mới học sinh" open={isFormOpen}
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
                        <Col xs={24}>
                            <h4 style={{ margin: "0px 0px 20px 0px" }}>Thông tin học sinh</h4>
                        </Col>

                        {/* row 1  học sinh */}
                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
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
                                <Select
                                    mode="multiple"
                                    placeholder="Chọn lớp học"
                                    allowClear={true}
                                    options={classOptions}
                                >
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
                                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                            >
                                <DatePicker locale={locale} />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="Số điện thoại phụ huynh (phân vân id hay sđt parent)"
                                name="parentTelephone"
                            >
                                <Input placeholder="Nhập ID của phụ huynh" />
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

export default StudentForm;