import { Breadcrumb, Button, Radio, Table, Tabs } from "antd";
import dayjs from "dayjs";
import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAllStudentAttendance } from "../../services/api.service";

const CheckInStudentAttendancePage = () => {
    const { className } = useParams();
    const [activeKey, setActiveKey] = useState("1");
    const [studentData, setStudentData] = useState([]); // Lưu trữ dữ liệu gốc
    const [radioValues, setRadioValues] = useState({}); // Lưu trữ giá trị radio cho từng hàng
    const newTabIndex = useRef(0);

    useEffect(() => {
        fetchStudentAttendanceInClass();
    }, []);

    // Tách các cột của bảng ra để tránh vấn đề re-render
    const columnsTable = [
        {
            title: 'STT',
            dataIndex: "stt",
            render: (_, record, index) => <span>{index + 1}</span>
        },
        {
            title: "Tên học sinh",
            render: (_, record) => <span>{record.student.name}</span>
        },
        {
            title: "Trạng thái",
            render: (_, record) => (
                <Radio.Group
                    onChange={(e) => onChangeRadio(e, record)}
                    value={radioValues[record.key]}
                    name={`attendance-${record.key}`}
                >
                    <Radio value={true}>Có mặt</Radio>
                    <Radio value={false}>Vắng mặt</Radio>
                </Radio.Group>
            )
        }
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
                setStudentData(groupSlot);

                // Khởi tạo radioValues với trạng thái điểm danh hiện có
                const initialValues = {};
                groupSlot.forEach(slotGroup => {
                    slotGroup.students.forEach((student, index) => {
                        const key = `${slotGroup.slot}-${index}`;
                        initialValues[key] = student.status !== undefined ? student.status : null;
                    });
                });
                setRadioValues(initialValues);
            }
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu điểm danh:", error);
        }
    };

    const onChangeRadio = (e, record) => {
        const value = e.target.value;
        setRadioValues(prev => {
            const newValues = { ...prev, [record.key]: value };
            console.log("Đã cập nhật giá trị radio:", newValues);
            return newValues;
        });
    };

    // Tạo items cho Tabs dựa trên studentData và radioValues
    const getTabItems = () => {
        if (!studentData.length) return [];

        return studentData.map((slotGroup) => ({
            label: `Ca ${slotGroup.slot}`,
            key: slotGroup.slot.toString(),
            closable: slotGroup.slot !== 1,
            children: (
                <Table
                    columns={columnsTable}
                    dataSource={slotGroup.students.map((student, index) => {
                        const key = `${slotGroup.slot}-${index}`;
                        return {
                            ...student,
                            key: key,
                        };
                    })}
                    pagination={false}
                    rowKey={record => record.key}
                />
            )
        }));
    };

    const onChangeTab = (newActiveKey) => {
        setActiveKey(newActiveKey);
    };

    const add = () => {
        const newActiveKey = `newTab${newTabIndex.current++}`;
        const newPanes = [...items];
        newPanes.push({
            label: 'Tab mới',
            children: 'Nội dung của tab mới',
            key: newActiveKey
        });
        setItems(newPanes);
        setActiveKey(newActiveKey);
    };

    const remove = (targetKey) => {
        let newActiveKey = activeKey;
        let lastIndex = -1;
        const items = getTabItems();
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
        setActiveKey(newActiveKey);
        // Cập nhật lại studentData sau khi xóa tab
        setStudentData(prevData =>
            prevData.filter(group => group.slot.toString() !== targetKey)
        );
    };

    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };

    // Lấy items động từ studentData và radioValues
    const items = getTabItems();

    return (
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
            <Tabs
                type="editable-card"
                onChange={onChangeTab}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
            />
            <div style={{ display: "flex", justifyContent: "end", margin: "20px" }}>
                <Button type="primary">
                    Lưu
                </Button>
            </div>
        </div>
    );
};

export default CheckInStudentAttendancePage;