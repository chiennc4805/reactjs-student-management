import { grey } from "@ant-design/colors";
import { Card, Col, Collapse, Row, Switch, Tooltip } from "antd";
import React from "react";
import { colorMethod } from "../../config/utils";

const ModuleApi = ({ form, listPermissions }) => {
    const handleSwitchAll = (value, name) => {
        const child = listPermissions?.find((item) => item.module === name);
        if (child) {
            child?.permissions?.forEach((item) => {
                if (item.id) form.setFieldValue(["permissions", item.id], value);
            });
        }
    };

    const handleSingleCheck = (value, child, parent) => {
        form.setFieldValue(["permissions", child], value);

        // Check all
        const temp = listPermissions?.find((item) => item.module === parent);
        if (temp?.module) {
            const restPermission = temp?.permissions?.filter((item) => item.id !== child);
            if (restPermission && restPermission.length) {
                const allTrue = restPermission.every((item) =>
                    form.getFieldValue(["permissions", item.id])
                );
                form.setFieldValue(["permissions", parent], allTrue && value);
            }
        }
    };

    // Tạo mảng items cho Collapse
    const collapseItems = listPermissions?.map((item, index) => ({
        key: index.toString(),
        label: (
            <div>{item.module}</div>
        ),
        extra: (
            <div className="customize-form-item">
                <Switch
                    checked={form.getFieldValue(["permissions", item.module]) || false}
                    onChange={(v) => handleSwitchAll(v, item.module)}
                />
            </div>
        ),
        children: (
            <Row gutter={[16, 16]}>
                {item.permissions?.map((value, i) => (
                    <Col lg={12} md={12} sm={24} key={i}>
                        <Card
                            size="small"
                            style={{
                                display: "flex",
                                alignItems: "center", // Căn giữa theo chiều dọc
                                padding: "5px 5px 5px 0px", // Thêm khoảng cách bên trong
                            }}
                        >
                            {/* Switch và nội dung trên cùng một dòng */}
                            <div style={{ display: "flex", alignItems: "start", width: "100%" }}>
                                <Switch
                                    checked={form.getFieldValue(["permissions", value.id]) || false}
                                    onChange={(v) => handleSingleCheck(v, value.id, item.module)}
                                    style={{ marginRight: "10px" }}
                                />
                                <div style={{ flex: 1, margin: "-5px 0px 5px 0px" }}>
                                    <Tooltip title={value?.name}>
                                        <p style={{ marginBottom: 3 }}>
                                            {value?.name || ""}
                                        </p>
                                    </Tooltip>
                                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                                        <p
                                            style={{
                                                fontWeight: "bold",
                                                marginBottom: 0,
                                                color: colorMethod(value?.method || ""),
                                            }}
                                        >
                                            {value?.method || ""}
                                        </p>
                                        <p style={{ marginBottom: 0, color: grey[5] }}>
                                            {value?.apiPath || ""}
                                        </p>
                                    </div>
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