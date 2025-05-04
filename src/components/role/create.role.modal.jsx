import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Form, Input, Modal, notification, Row, Switch } from "antd";
import dayjs from "dayjs";
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useEffect, useState } from "react";
import { createClassAPI, fetchAllPermissionsAPI } from "../../services/api.service";
import ModuleApi from "./list.module.api";

const RoleForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

    const [isFormOpen, setIsFormOpen] = useState(false)

    const { loadRole } = props

    const [form] = Form.useForm();

    const [listPermissions, setListPermissions] = useState(null);

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    useEffect(() => {
        const init = async () => {
            const res = await fetchAllPermissionsAPI(1, 100)
            setListPermissions(groupByPermission(res.data.result))
        }
        init()
    }, [])

    const groupByPermission = (data) => {
        const groupedData = data.reduce((acc, item) => {
            acc[item.module] = acc[item.module] || [];
            acc[item.module].push(item);
            return acc;
        }, {});
        return Object.keys(groupedData).map((key) => ({
            module: key,
            permissions: groupedData[key],
        }));
    };

    const onFinish = async (values) => {
        const subject = { id: values.subject }
        const teacher = { telephone: values.teacher }
        const campus = { id: values.campus }

        dayjs.extend(customParseFormat)
        const openDay = dayjs(values.openDay).format('YYYY-MM-DD')

        const res = await createClassAPI(values.name, subject, teacher, campus, openDay)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới vai trò thành công')
            await loadRole()
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
                    Danh sách vai trò
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
                title="Tạo mới vai trò" open={isFormOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                    setIsFormOpen(false);
                    form.resetFields()
                }
                }
                okText="Thêm mới"
                cancelText="Huỷ"
                // footer={(_, { OkBtn, CancelBtn }) => (
                //     <>
                //         <OkBtn />
                //         <CancelBtn />
                //     </>
                // )}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '60%',
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
                            <Form.Item style={{ width: "48%" }}
                                label="Tên vai trò"
                                name="name"
                                rules={[{ required: true, message: 'Vui lòng điền tên vai trò !' }]}
                            >
                                <Input placeholder="Nhập tên vai trò" />
                            </Form.Item>

                            <Form.Item style={{ width: "48%" }}
                                label="Trạng thái"
                                name="active"
                                valuePropName="checked"
                                initialValue={true}
                            >
                                <Switch checkedChildren="ACTIVE" unCheckedChildren="INACTIVE" />
                            </Form.Item>
                        </Col>

                        <Col span={24} style={{ display: "flex", justifyContent: "space-between" }}>
                            <Form.Item style={{ width: "100%" }}
                                label="Miêu tả"
                                name="description"
                                rules={[{ required: true, message: "Vui lòng không bỏ trống" }]}
                            >
                                <Input.TextArea placeholder="Nhập miêu tả vai trò" autoSize={{ minRows: 2 }} />
                            </Form.Item>
                        </Col>

                        <Col span={24}>
                            <Card
                                title="Quyền hạn"
                                extra="Các quyền hạn được phép cho vai trò này"
                                style={{ color: "#d81921", marginBottom: 20 }}
                                variant="outlined"
                            >
                                <ModuleApi form={form} listPermissions={listPermissions} />
                            </Card>
                        </Col>

                    </Row>
                </Form>
            </Modal >
        </>
    )
}

export default RoleForm;