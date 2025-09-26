import { Card, Col, Form, Input, Modal, notification, Row, Switch } from "antd";
import { useEffect } from "react";
import { updateRoleAPI } from "../../services/api.service";
import ModuleApi from "./list.module.api";

const UpdateRoleModal = (props) => {
    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const [form] = Form.useForm();

    const { isUpdateFormOpen, setIsUpdateFormOpen, loadRole, setDataUpdate, dataUpdate, listAllPermissions } = props;

    useEffect(() => {
        if (dataUpdate) {
            // Thiết lập form với giá trị ban đầu
            const initialValues = {
                id: dataUpdate.id,
                name: dataUpdate.name,
                description: dataUpdate.description,
                active: dataUpdate.active !== undefined ? dataUpdate.active : false,
                permissions: {}
            };

            // Đặt giá trị cho tất cả permissions là false
            if (listAllPermissions && listAllPermissions.length > 0) {
                listAllPermissions.forEach((group) => {
                    initialValues.permissions[group.module] = false;

                    if (group.permissions && group.permissions.length > 0) {
                        group.permissions.forEach((permission) => {
                            initialValues.permissions[permission.id] = false;
                        });
                    }
                });
            }

            // Cập nhật giá trị của permissions từ dataUpdate
            if (dataUpdate.permissions && dataUpdate.permissions.length > 0) {
                dataUpdate.permissions.forEach((permission) => {
                    initialValues.permissions[permission.id] = true;
                });

                // Cập nhật trạng thái module dựa trên permissions
                listAllPermissions.forEach((group) => {
                    if (group.permissions && group.permissions.length > 0) {
                        const allPermissionsSelected = group.permissions.every(permission =>
                            dataUpdate.permissions.some(p => p.id === permission.id)
                        );
                        initialValues.permissions[group.module] = allPermissionsSelected;
                    }
                });
            }

            form.setFieldsValue(initialValues);
        }
    }, [dataUpdate]);

    const onFinish = async (values) => {
        console.log("form values:", values);

        const permissions = [];
        if (values.permissions) {
            Object.keys(values.permissions).forEach(key => {
                if (key.length === 36 && values.permissions[key] === true) {
                    permissions.push({ id: key });
                }
            });
        }

        const res = await updateRoleAPI(values.id, values.name, values.description, values.active, permissions)
        if (res.data) {
            api.success({
                message: 'Thành công',
                description: 'Cập nhật vai trò thành công'
            });
            await loadRole();
            reloadAndCloseModal();
        } else {
            api.error({
                message: 'Thất bại',
                description: JSON.stringify(res.message)
            });
        }
    };

    const reloadAndCloseModal = () => {
        form.resetFields();
        setIsUpdateFormOpen(false);
        setDataUpdate(null);
    };

    return (
        <>
            {contextHolder}

            <Modal
                title="Cập nhật vai trò"
                open={isUpdateFormOpen}
                onOk={() => form.submit()}
                onCancel={reloadAndCloseModal}
                okText="Cập nhật"
                cancelText="Huỷ"
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <CancelBtn />
                        <OkBtn />
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
                destroyOnClose={true}
            >
                <Form
                    form={form}
                    onFinish={onFinish}
                    layout="vertical"
                    preserve={false}
                >
                    <Row justify="center" style={{ marginTop: "20px" }}>
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
    );
};

export default UpdateRoleModal;