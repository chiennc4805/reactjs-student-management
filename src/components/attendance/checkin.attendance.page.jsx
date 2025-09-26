import { Breadcrumb, Button, Form, notification, Radio, Table, Tabs } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { fetchAllStudentAttendance, fetchAllTeacherAttendance, updateStudentAttendance, updateTeacherAttendance } from "../../services/api.service";

const CheckInStudentAttendancePage = () => {
    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });
    const { className } = useParams();
    const [activeKey, setActiveKey] = useState("1");
    const [studentData, setStudentData] = useState([]); // Lưu trữ dữ liệu gốc
    const [form] = Form.useForm();
    const newTabIndex = useRef(1);
    const [items, setItems] = useState([])
    const navigate = useNavigate()

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

    const columnsTableStudent = [
        {
            title: 'STT',
            render: (_, record, index) => <span>{index + 1}</span>,
            width: "30%"

        },
        {
            title: "Tên học sinh",
            render: (_, record) => <span>{record.student.name}</span>,
            width: "40%"
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

    const columnsTableTeacher = [
        {
            title: 'STT',
            render: (_, record, index) => <span>{index + 1}</span>,
            width: "30%"

        },
        {
            title: "Tên giáo viên",
            render: (_, record) => <span>{record.teacher.name}</span>,
            width: "40%"
        },
        {
            title: "Trạng thái",
            render: (_, record) => (
                <Form.Item
                    name={['teacherAttendances', record.key, 'status']}
                >
                    <Radio.Group>
                        <Radio value={true}>Có mặt</Radio>
                        <Radio value={false}>Vắng mặt</Radio>
                    </Radio.Group>
                </Form.Item>
            ),
        },
    ];

    const groupStudentAndTeacherBySlot = (studentData, teacherData) => {
        const groupedData = {};
        studentData.forEach(item => {
            if (!groupedData[item.slot]) {
                groupedData[item.slot] = { slot: item.slot, studentAttendances: [], teacherAttendances: [] };
            }
            groupedData[item.slot].studentAttendances.push(item);
        });
        teacherData.forEach(item => {
            if (!groupedData[item.slot]) {
                groupedData[item.slot] = { slot: item.slot, studentAttendances: [], teacherAttendances: [] };
            }
            groupedData[item.slot].teacherAttendances.push(item);
        });

        return Object.values(groupedData);
    };

    const fetchStudentAttendanceInClass = async () => {
        try {
            let groupSlot;
            const resStudent = await fetchAllStudentAttendance(`date~'${dayjs().format('YYYY-MM-DD')}' and classInfo.name~'${className}'`);
            const resTeacher = await fetchAllTeacherAttendance(`date~'${dayjs().format('YYYY-MM-DD')}' and classInfo.name~'${className}'`);
            if (resStudent.data && resStudent.data.result.length && resTeacher.data && resTeacher.data.result.length) {
                groupSlot = groupStudentAndTeacherBySlot(resStudent.data.result, resTeacher.data.result)

                const initialValues = {
                    studentAttendances: groupSlot.reduce((acc, slotGroup) => {
                        slotGroup.studentAttendances.forEach(studentAttendance => {
                            acc[studentAttendance.id] = { status: studentAttendance.status };
                        });
                        return acc;
                    }, {}),
                    teacherAttendances: groupSlot.reduce((acc, slotGroup) => {
                        slotGroup.teacherAttendances.forEach(teacherAttendance => {
                            acc[teacherAttendance.id] = { status: teacherAttendance.status };
                        });
                        return acc;
                    }, {}),
                };
                form.setFieldsValue(initialValues);
                setStudentData(groupSlot);
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
                <>
                    <h3 style={{ display: "flex", justifyContent: "start", marginBottom: "10px" }}>Điểm danh giáo viên</h3>
                    <Table
                        columns={columnsTableTeacher}
                        dataSource={slotGroup.teacherAttendances.map((teacherAttendance) => ({
                            ...teacherAttendance,
                            key: `${teacherAttendance.id}`,
                        }))}
                        pagination={false}
                        rowKey="key"
                        showHeader={false}
                    />

                    <h3 style={{ display: "flex", justifyContent: "start", margin: "30px 0px 10px 0px" }}>Điểm danh học sinh</h3>
                    <Table
                        columns={columnsTableStudent}
                        dataSource={slotGroup.studentAttendances.map((studentAttendance) => ({
                            ...studentAttendance,
                            key: `${studentAttendance.id}`,
                        }))}
                        pagination={false}
                        rowKey="key"
                        showHeader={false}
                    />
                </>
            ),
        }));
    };

    const onFinish = async (values) => {
        const reqStudentData = Object.keys(values.studentAttendances).map(sID => ({
            attendanceId: sID,
            status: values.studentAttendances[sID].status
        }))
        const resStudent = await updateStudentAttendance(reqStudentData)

        const reqTeacherData = Object.keys(values.teacherAttendances).map(tId => ({
            attendanceId: tId,
            status: values.teacherAttendances[tId].status
        }))
        const resTeacher = await updateTeacherAttendance(reqTeacherData[0])

        if (resStudent.data && resTeacher.data) {
            openNotificationWithIcon('success', 'Thành công', 'Điểm danh thành công')
            setTimeout(() => navigate("/attendance"), 1000)
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