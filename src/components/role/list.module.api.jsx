import { Card, Col, Collapse, Form, Row, Switch, Tooltip } from "antd";
import React from "react";

const ModuleApi = ({ form, listPermissions, dataUpdate }) => {

    const handleSwitchAll = (checked, name) => {
        const child = listPermissions?.find((item) => item.module === name);
        if (child) {
            child?.permissions?.forEach((item) => {
                if (item.id) form.setFieldValue(["permissions", item.id], checked);
            });
        }
        form.setFieldValue(["permissions", name], checked); // Cập nhật giá trị cho module
    };

    const handleSingleCheck = (value, child, parent) => {
        form.setFieldValue(["permissions", child], value);

        // Check all
        const group = listPermissions?.find((item) => item.module === parent);
        if (group?.module) {
            const restPermission = group?.permissions?.filter((item) => item.id !== child);
            if (restPermission && restPermission.length) {
                const commonState = restPermission.every((item) =>
                    form.getFieldValue(["permissions", item.id])
                );
                form.setFieldValue(["permissions", parent], commonState && value);
            }
        }
    };

    const collapseItems = listPermissions?.map((groupPermission, groupIndex) => ({
        key: groupIndex.toString(),
        label: <div>{groupPermission.module}</div>,
        extra: (
            <Form.Item
                name={["permissions", groupPermission.module]}
                valuePropName="checked"
                noStyle
                initialValue={false}
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
                                    initialValue={false}
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
            <Collapse items={collapseItems} />
        </Card>
    );
};

export default ModuleApi;