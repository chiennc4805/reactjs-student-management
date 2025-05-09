import { Breadcrumb, Button, Form, notification, Radio, Table, Tabs } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAllStudentAttendance, updateStudentAttendance } from "../../services/api.service";

const CheckInStudentAttendancePage = () => {
    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const { className } = useParams();
    const [activeKey, setActiveKey] = useState("1");
    const [studentData, setStudentData] = useState([]); // Lưu trữ dữ liệu gốc
    const [form] = Form.useForm();

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    useEffect(() => {
        fetchStudentAttendanceInClass();
    }, []);

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
                    name={['students', record.key, 'status']}
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
            students: groupedData[key],
        }));
    };

    const fetchStudentAttendanceInClass = async () => {
        try {
            const res = await fetchAllStudentAttendance(`date~'${dayjs().format('YYYY-MM-DD')}' and classInfo.name~'${className}'`);
            if (res.data && res.data.result.length) {
                const groupSlot = groupBySlot(res.data.result);
                console.log("groupSlot: ", groupSlot)
                setStudentData(groupSlot);

                // Thiết lập giá trị cho form
                const initialValues = {
                    students: groupSlot.reduce((acc, slotGroup) => {
                        slotGroup.students.forEach(student => {
                            acc[student.id] = { status: student.status };
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
                    dataSource={slotGroup.students.map((student, index) => ({
                        ...student,
                        key: `${student.id}`, // Tạo key duy nhất cho từng hàng
                    }))}
                    pagination={false}
                    rowKey="key"
                />
            ),
        }));
    };

    const onFinish = async (values) => {
        // Xử lý dữ liệu hoặc gửi lên API
        const reqData = Object.keys(values.students).map(sID => ({
            studentAttendanceId: sID,
            status: values.students[sID].status
        }))
        console.log("req data: ", reqData)
        const res = await updateStudentAttendance(reqData)
        if (res.data) {
            console.log("resData: ", res.data)
            openNotificationWithIcon('success', 'Thành công', 'Điểm danh thành công')
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }
    };

    const onChangeTab = (newActiveKey) => {
        setActiveKey(newActiveKey);
    };

    const items = getTabItems();

    return (
        <>
            {contextHolder}

            <div style={{ margin: "1%" }}>
                <Breadcrumb
                    style={{ marginBottom: "20px" }}
                    items={[
                        {
                            title: <Link to="/student-attendance" style={{ marginTop: "2px" }}>Điểm danh {dayjs().format("DD/MM")}</Link>,
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
                    <Form.Item
                        style={{ display: "none" }}
                        name="className"
                        initialValue={className}
                    >
                    </Form.Item>
                    <Form.Item
                        style={{ display: "none" }}
                        name="date"
                        initialValue={dayjs().format("YYYY-MM-DD")}
                    >
                    </Form.Item>
                    <Form.Item
                        style={{ display: "none" }}
                        name="slot"
                        initialValue={activeKey}
                    >
                    </Form.Item>
                    <Tabs
                        type="editable-card"
                        onChange={onChangeTab}
                        activeKey={activeKey}
                        items={items}
                    />
                    <div style={{ display: "flex", justifyContent: "end", margin: "20px" }}>
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