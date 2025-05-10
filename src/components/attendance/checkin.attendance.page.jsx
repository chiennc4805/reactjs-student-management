import { Breadcrumb, Button, Form, notification, Radio, Table, Tabs } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAllStudentAttendance, updateStudentAttendance } from "../../services/api.service";

const CheckInStudentAttendancePage = () => {
    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const { className } = useParams();
    const [activeKey, setActiveKey] = useState("1");
    const [studentData, setStudentData] = useState([]); // Lưu trữ dữ liệu gốc
    const [form] = Form.useForm();
    const newTabIndex = useRef(1);
    const [items, setItems] = useState([])

    useEffect(() => {
        fetchStudentAttendanceInClass();
    }, []);

    useEffect(() => {
        setItems(getTabItems())
    }, [studentData]);


    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({ label: 'New Tab', children: 'Content of new Tab', key: newActiveKey });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };
    const remove = targetKey => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        items.forEach((item, i) => {
            if (item.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const newPanes = items.filter(item => item.key !== targetKey);
        if (newPanes.length && newActiveKey === targetKey) {
            if (lastIndex >= 0) {
                newActiveKey = newPanes[lastIndex].key;
            } else {
                newActiveKey = newPanes[0].key;
            }
        }
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };
    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    const columnsTable = [
        {
            title: 'STT',
            render: (_, record, index) => <span>{index + 1}</span>,
        },
        {
            title: "Tên học sinh",
            render: (_, record) => <span>{record.student.name}</span>,
        },
        {
            title: "Trạng thái",
            render: (_, record) => (
                <Form.Item
                    name={['studentAttendances', record.key, 'status']}
                >
                    <Radio.Group>
                        <Radio value={true}>Có mặt</Radio>
                        <Radio value={false}>Vắng mặt</Radio>
                    </Radio.Group>
                </Form.Item>
            ),
        },
    ];

    const groupBySlot = (data) => {
        const groupedData = data.reduce((acc, item) => {
            acc[item.slot] = acc[item.slot] || [];
            acc[item.slot].push(item);
            return acc;
        }, {});
        return Object.keys(groupedData).map((key) => ({
            slot: key,
            studentAttendances: groupedData[key],
        }));
    };

    const fetchStudentAttendanceInClass = async () => {
        try {
            const res = await fetchAllStudentAttendance(`date~'${dayjs().format('YYYY-MM-DD')}' and classInfo.name~'${className}'`);
            if (res.data && res.data.result.length) {
                const groupSlot = groupBySlot(res.data.result);
                setStudentData(groupSlot);

                const initialValues = {
                    studentAttendances: groupSlot.reduce((acc, slotGroup) => {
                        slotGroup.studentAttendances.forEach(studentAttendance => {
                            acc[studentAttendance.id] = { status: studentAttendance.status };
                        });
                        return acc;
                    }, {}),
                };
                form.setFieldsValue(initialValues);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu điểm danh:", error);
        }
    };

    const getTabItems = () => {
        if (!studentData.length) return [];
        return studentData.map((slotGroup) => ({
            label: `Ca ${slotGroup.slot}`,
            key: slotGroup.slot.toString(),
            closable: slotGroup.slot !== 1,
            children: (
                <Table
                    columns={columnsTable}
                    dataSource={slotGroup.studentAttendances.map((studentAttendance) => ({
                        ...studentAttendance,
                        key: `${studentAttendance.id}`, // Tạo key duy nhất cho từng hàng
                    }))}
                    pagination={false}
                    rowKey="key"
                />
            ),
        }));
    };

    const onFinish = async (values) => {
        const reqData = Object.keys(values.studentAttendances).map(sID => ({
            studentAttendanceId: sID,
            status: values.studentAttendances[sID].status
        }))
        console.log("values: ", values)
        const res = await updateStudentAttendance(reqData)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Điểm danh thành công')
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }
    };

    const onChangeTab = (newActiveKey) => {
        setActiveKey(newActiveKey);
    };

    return (
        <>
            {contextHolder}

            <div style={{ margin: "1%" }}>
                <Breadcrumb
                    style={{ marginBottom: "20px" }}
                    items={[
                        {
                            title: <Link to="/attendance" style={{ marginTop: "2px" }}>Điểm danh {dayjs().format("DD/MM")}</Link>,
                        },
                        {
                            title: <h3>{className}</h3>,
                        },
                    ]}
                />
                <Form
                    form={form}
                    onFinish={onFinish}
                >
                    <Tabs
                        type="editable-card"
                        onChange={onChangeTab}
                        activeKey={activeKey}
                        onEdit={onEdit}
                        items={items}
                    />
                    <div style={{ display: "flex", justifyContent: "center", margin: "20px" }}>
                        <Button type="primary" htmlType="submit">
                            Lưu
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};

export default CheckInStudentAttendancePage;