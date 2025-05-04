import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, DatePicker, Form, Input, InputNumber, Modal, Row, Select, notification } from "antd";
import locale from 'antd/es/date-picker/locale/vi_VN';
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useState } from "react";
import { createParentAPI, createStudentAPI, fetchAllParentsAPI } from "../../services/api.service";

const StudentForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 2 });

    const [isFormOpen, setIsFormOpen] = useState(false)

    const { loadStudent, classOptions } = props

    const [form] = Form.useForm();

    const [parentData, setParentData] = useState(null)

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {
        dayjs.extend(customParseFormat)

        if (!parentData) {
            const birthDateParent = dayjs(values.parentBirthDate).format('YYYY-MM-DD')
            const genderParent = values.parentGender === "1" ? true : false
            const resParentAPI = await createParentAPI(values.parentName, genderParent, birthDateParent, values.parentTelephone, values.parentAddress, values.parentZaloName, values.parentFacebookName)
            if (resParentAPI.data) {
                openNotificationWithIcon('success', 'Thành công', 'Thêm mới phụ huynh thành công')
            } else {
                openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
                return
            }
        }

        const birthDateStudent = dayjs(values.birthDate).format('YYYY-MM-DD')
        const genderStudent = values.gender === "1" ? true : false
        const classesStudent = values.class.map(x => ({ id: x }))
        const parent = { telephone: values.parentTelephone }

        const res = await createStudentAPI(values.name, genderStudent, birthDateStudent, values.height, values.weight, classesStudent, parent)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới học sinh thành công')
            await loadStudent()
            setIsFormOpen(false)
            form.resetFields()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }

    };

    const fetchParentInfoByInput = async (input) => {
        const phonePattern = /^0\d{9}$/;
        if (phonePattern.test(input)) {
            const res = await fetchAllParentsAPI(1, 1, `telephone~'${input}'`)
            if (res.data.meta.total === 1 && !parentData) {
                const data = res.data.result[0]
                form.setFieldValue("parentName", data.name)
                form.setFieldValue("parentAddress", data.address)
                form.setFieldValue("parentGender", data.gender === true ? "Nam" : "Nữ")

                const birthDate = dayjs(data.birthDate)
                form.setFieldValue("parentBirthDate", birthDate)

                form.setFieldValue("parentZaloName", data.zaloName)
                form.setFieldValue("parentFacebookName", data.facebookName)

                setParentData(res.data.result[0])

            }
        } else {
            form.resetFields(["parentName", "parentAddress", "parentGender", "parentBirthDate", "parentZaloName", "parentFacebookName"])
            if (parentData) {
                setParentData(null)
            }
        }
    }

    return (
        <>
            {contextHolder}

            <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%" }}>
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
                                rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                            >
                                <Select
                                    mode="multiple"
                                    placeholder="Chọn lớp học"
                                    allowClear={true}
                                    options={classOptions}
                                    showSearch
                                    filterOption={(input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                    }
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
                                    <Select.Option value="1">Nam</Select.Option>
                                    <Select.Option value="0">Nữ</Select.Option>
                                </Select>
                            </Form.Item>

                            <Form.Item style={{ width: "23%" }}
                                label="Ngày sinh"
                                name="birthDate"
                                rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                            >
                                <DatePicker locale={locale} />
                            </Form.Item>

                            <Form.Item style={{ width: "23%" }}
                                label="Chiều cao"
                                name="height"
                                initialValue={""}
                                rules={[{ required: true, message: 'Vui lòng điền chiều cao!' }]}
                            >
                                <InputNumber
                                    addonBefore="+"
                                    addonAfter="cm"
                                />
                            </Form.Item>

                            <Form.Item style={{ width: "23%" }}
                                label="Cân nặng"
                                name="weight"
                                initialValue={""}
                                rules={[{ required: true, message: 'Vui lòng điền cân nặng!' }]}
                            >
                                <InputNumber
                                    addonBefore="+"
                                    addonAfter="kg"
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24}>
                            <h4 style={{ margin: "0px 0px 20px 0px" }}>Thông tin phụ huynh</h4>
                        </Col>

                        {/* row 1  phụ huynh */}
                        {parentData ?
                            <>
                                <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Item style={{ width: "32%" }}
                                        label="Số điện thoại"
                                        name="parentTelephone"
                                        rules={[
                                            {
                                                required: true, message: 'Vui lòng điền số điện thoại phụ huynh!'
                                            },
                                            {
                                                pattern: /^0\d{9}$/,
                                                message: 'Vui lòng điền số điện thoại hợp lệ',
                                            }
                                        ]}
                                    >
                                        <Input onChange={(event) => { fetchParentInfoByInput(event.target.value) }} />
                                    </Form.Item>

                                    <Form.Item style={{ width: "32%" }}
                                        label="Họ và tên"
                                        name="parentName"
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

                                <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Item style={{ width: "23%" }}
                                        label="Giới tính"
                                        name="parentGender"
                                    >
                                        <Select
                                            placeholder="Chọn giới tính"
                                            allowClear={true}
                                            disabled
                                        >
                                            <Select.Option value="1">Nam</Select.Option>
                                            <Select.Option value="0">Nữ</Select.Option>
                                        </Select>
                                    </Form.Item >

                                    <Form.Item style={{ width: "23%" }}
                                        label="Ngày sinh"
                                        name="parentBirthDate"
                                    >
                                        <DatePicker locale={locale} disabled />
                                    </Form.Item>

                                    <Form.Item style={{ width: "23%" }}
                                        label="Tên Zalo"
                                        name="parentZaloName"
                                    >
                                        <Input disabled />
                                    </Form.Item>

                                    <Form.Item style={{ width: "23%" }}
                                        label="Tên Facebook"
                                        name="parentFacebookName"
                                    >
                                        <Input disabled />
                                    </Form.Item>
                                </Col>
                            </>
                            :
                            <>
                                <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Item style={{ width: "32%" }}
                                        label="Số điện thoại"
                                        name="parentTelephone"
                                        rules={[
                                            {
                                                required: true, message: 'Vui lòng điền số điện thoại!'
                                            },
                                            {
                                                pattern: /^0\d{9}$/,
                                                message: 'Vui lòng điền số điện thoại hợp lệ',
                                            }
                                        ]}
                                    >
                                        <Input onChange={(event) => { fetchParentInfoByInput(event.target.value) }} />
                                    </Form.Item>

                                    <Form.Item style={{ width: "32%" }}
                                        label="Họ và tên"
                                        name="parentName"
                                        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item style={{ width: "32%" }}
                                        label="Địa chỉ"
                                        name="parentAddress"
                                        rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} style={{ display: "flex", justifyContent: "space-between" }}>
                                    <Form.Item style={{ width: "25%" }}
                                        label="Giới tính"
                                        name="parentGender"
                                        rules={[{ required: true, message: 'Vui lòng chọn giới tính!' }]}
                                    >
                                        <Select
                                            placeholder="Chọn giới tính"
                                            allowClear={true}
                                        >
                                            <Select.Option value="1">Nam</Select.Option>
                                            <Select.Option value="0">Nữ</Select.Option>
                                        </Select>
                                    </Form.Item >

                                    <Form.Item style={{ width: "23%" }}
                                        label="Ngày sinh"
                                        name="parentBirthDate"
                                        rules={[{ required: true, message: 'Vui lòng chọn ngày sinh!' }]}
                                    >
                                        <DatePicker locale={locale} />
                                    </Form.Item>

                                    <Form.Item style={{ width: "23%" }}
                                        label="Tên Zalo"
                                        name="parentZaloName"
                                    >
                                        <Input />
                                    </Form.Item>

                                    <Form.Item style={{ width: "23%" }}
                                        label="Tên Facebook"
                                        name="parentFacebookName"
                                    >
                                        <Input />
                                    </Form.Item>
                                </Col>
                            </>
                        }
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default StudentForm;