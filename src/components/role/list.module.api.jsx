import { Card, Col, Collapse, Form, Row, Switch, Tooltip } from "antd";
import { useEffect, useState } from "react";

const ModuleApi = ({ form, listAllPermissions, dataUpdate }) => {
    // Thêm state để kiểm soát quá trình khởi tạo
    const [initialized, setInitialized] = useState(false);

    // Tạo một hàm riêng để thiết lập giá trị form
    const setupFormValues = () => {
        // Thiết lập tất cả các permissions ban đầu thành false
        const formValues = {
            permissions: {}
        };

        listAllPermissions.forEach((group) => {
            formValues.permissions[group.module] = false;

            if (group.permissions && group.permissions.length > 0) {
                group.permissions.forEach((permission) => {
                    formValues.permissions[permission.id] = false;
                });
            }
        });

        // Thiết lập các permissions từ dataUpdate thành true nếu có dataUpdate
        if (dataUpdate && dataUpdate.permissions && dataUpdate.permissions.length > 0) {
            dataUpdate.permissions.forEach((permission) => {
                formValues.permissions[permission.id] = true;
            });

            // Cập nhật trạng thái các module dựa trên permissions
            listAllPermissions.forEach((group) => {
                if (group.permissions && group.permissions.length > 0) {
                    const allPermissionsInGroup = group.permissions.map(p => p.id);
                    const dataUpdatePermissionIds = dataUpdate.permissions.map(p => p.id);

                    // Kiểm tra xem tất cả permissions trong nhóm này đã được chọn chưa
                    const commonState = allPermissionsInGroup.every(permId =>
                        dataUpdatePermissionIds.includes(permId)
                    );

                    formValues.permissions[group.module] = commonState;
                }
            });
        }
        form.setFieldsValue(formValues);
    };

    useEffect(() => {
        if (initialized) return;

        const timer = setTimeout(() => {
            setupFormValues();
            setInitialized(true);
        }, 300);

        return () => clearTimeout(timer);
    }, [dataUpdate, initialized]);

    // Reset initialized khi dataUpdate thay đổi
    useEffect(() => {
        setInitialized(false);
    }, [dataUpdate]);

    const handleSwitchAll = (checked, name) => {
        const child = listAllPermissions?.find((item) => item.module === name);
        if (child) {
            const updateValues = {
                permissions: {}
            };

            updateValues.permissions[name] = checked;
            child.permissions.forEach((item) => {
                if (item.id) {
                    updateValues.permissions[item.id] = checked;
                }
            });

            form.setFieldsValue(updateValues);
        }
    };

    const handleSingleCheck = (value, child, parent) => {
        // Cập nhật giá trị permission.id
        form.setFieldValue(["permissions", child], value);

        // Kiểm tra và cập nhật giá trị parent (module)
        const group = listAllPermissions?.find((item) => item.module === parent);
        if (group?.module) {
            const allPermissionsInGroup = group.permissions.map(p => p.id);

            // Kiểm tra trạng thái của tất cả permissions sau khi cập nhật
            setTimeout(() => {
                const formValues = form.getFieldsValue(true);
                const commonState = allPermissionsInGroup.every(permId =>
                    formValues.permissions[permId] === true
                );

                // Cập nhật giá trị module
                form.setFieldValue(["permissions", parent], commonState);
            }, 50);
        }
    };

    const collapseItems = listAllPermissions.map((groupPermission, groupIndex) => ({
        key: groupIndex.toString(),
        label: <div>{groupPermission.module}</div>,
        extra: (
            <Form.Item
                name={["permissions", groupPermission.module]}
                valuePropName="checked"
                noStyle
            >
                <Switch onChange={(checked) => handleSwitchAll(checked, groupPermission.module)} />
            </Form.Item>
        ),
        children: (
            <Row gutter={[16, 16]}>
                {groupPermission.permissions?.map((permission, index) => (
                    <Col lg={12} md={12} sm={24} key={index}>
                        <Card
                            size="small"
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: "5px 5px 5px 0px",
                            }}
                        >
                            <div style={{ display: "flex", alignItems: "start", width: "100%" }}>
                                <Form.Item
                                    name={["permissions", permission.id]}
                                    valuePropName="checked"
                                    noStyle
                                >
                                    <Switch
                                        onChange={(checked) => handleSingleCheck(checked, permission.id, groupPermission.module)}
                                        style={{ marginRight: "10px" }}
                                    />
                                </Form.Item>
                                <div style={{ flex: 1, margin: "-5px 0px 5px 0px" }}>
                                    <Tooltip title={permission?.name}>
                                        <p style={{ marginBottom: 3 }}>{permission?.name || ""}</p>
                                    </Tooltip>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
        ),
    }));

    return (
        <Card size="small" variant="borderless" style={{ padding: "0px" }}>
            <Collapse items={collapseItems} defaultActiveKey={["0"]} />
        </Card>
    );
};

export default ModuleApi;