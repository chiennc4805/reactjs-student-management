import { Card, Col, Form, Input, Modal, notification, Row, Switch } from "antd";
import { useEffect } from "react";
import { updateRoleAPI } from "../../services/api.service";
import ModuleApi from "./list.module.api";


const UpdateRoleModal = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const [form] = Form.useForm()

    const { isUpdateFormOpen, setIsUpdateFormOpen, loadRole, setDataUpdate, dataUpdate, listAllPermissions } = props

    useEffect(() => {
        if (dataUpdate) {
            form.setFieldValue("id", dataUpdate.id)
            form.setFieldValue("name", dataUpdate.name)
            form.setFieldValue("description", dataUpdate.description)
            form.setFieldValue("active", dataUpdate.active)
        }

        if (dataUpdate && listAllPermissions) {
            listAllPermissions.forEach((group) => {
                group.permissions.forEach((permission) => {
                    const isChecked = dataUpdate.permissions.some((p) => p.id === permission.id);
                    form.setFieldValue(["permissions", permission.id], isChecked);
                });
                const commonState = group.permissions.every(permission => form.getFieldValue(["permissions", permission.id]));
                form.setFieldValue(["permissions", group.module], commonState && true);
            });
        } else if (listAllPermissions) {
            listAllPermissions.forEach((group) => {
                form.setFieldValue(["permissions", group.module], false);
                group.permissions.forEach((permission) => {
                    form.setFieldValue(["permissions", permission.id], false);
                });
            });
        }

    }, [dataUpdate])

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {
        const permissions = Object.keys(values.permissions).filter(key => values.permissions[key] === true && key.length === 36).map(x => ({ id: x }))

        const res = await updateRoleAPI(values.id, values.name, values.description, values.active, permissions)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Cập nhật vai trò thành công')
            await loadRole()
            reloadAndCloseModal()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }

        console.log("values form: ", values)
    };

    const reloadAndCloseModal = () => {
        setIsUpdateFormOpen(false)
        setDataUpdate(null)
    }

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
                            <Form.Item
                                style={{ display: "none" }}
                                name="id"
                            >
                                <Input type="hidden" />
                            </Form.Item>

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
                                initialValue={dataUpdate?.active || true}
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
                                <ModuleApi form={form} listAllPermissions={listAllPermissions} dataUpdate={dataUpdate} />
                            </Card>
                        </Col>
                    </Row>
                </Form>
            </Modal>
        </>
    )
}

export default UpdateRoleModal;