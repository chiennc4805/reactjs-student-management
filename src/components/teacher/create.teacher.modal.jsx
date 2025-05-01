import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, Modal, notification, Row, Select } from "antd";
import locale from 'antd/es/date-picker/locale/vi_VN';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from "react";
import { createTeacherAPI } from "../../services/api.service";


const TeacherForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

    const [isFormOpen, setIsFormOpen] = useState(false)

    const { loadTeacher, subjectOptions } = props

    const [form] = Form.useForm();

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

        const res = await createTeacherAPI
            (values.name, gender, birthDate, values.telephone, values.address, values.zaloName, values.facebookName, subjects)

        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới giáo viên thành công')
            await loadTeacher()
            setIsFormOpen(false)
            form.resetFields()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }

    };

    return (
        <>
            {contextHolder}

            <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%" }}>
                <h3>
                    Danh sách giáo viên
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
                title="Thêm mới giáo viên" open={isFormOpen}
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

                        {/* row 1 */}
                        <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
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

export default TeacherForm;