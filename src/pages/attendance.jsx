import { Table, Tag } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllStudentAttendance } from "../services/api.service";

const AttendancePage = () => {

    const [tableItem, setTableItems] = useState([]);

    useEffect(() => {
        itemsInTable();
    }, [])

    // const groupedData = data.reduce((acc, item) => {
    //     acc[item.module] = acc[item.module] || [];
    //     acc[item.module].push(item);
    //     return acc;
    // }, {});
    // return Object.keys(groupedData).map((key) => ({
    //     module: key,
    //     permissions: groupedData[key],
    // }));

    const groupSlotInStatus = (dataArray) => {
        const groupData = dataArray.reduce((acc, item) => {
            acc[item.slot] = acc[item.slot] || []
            acc[item.slot].push(item.statusOfClass)
            return acc
        }, {})
        return Object.keys(groupData).map(key => ({
            slot: key,
            status: groupData[key][0]
        }))
    }

    const itemsInTable = async () => {
        const res = await fetchAllStudentAttendance(`date~'${dayjs().format("YYYY-MM-DD")}'`)
        if (res.data && res.data.result.length) { //res.data.result : array
            console.log("res: ", res.data.result)
            const setClassName = new Set(res.data.result.map(item => item.classInfo.name))
            const items = Array.from(setClassName).map((className, index) => {
                const dataOfCurrentClass = res.data.result.filter(item => item.classInfo.name === className)
                const statusOfEachClass = groupSlotInStatus(dataOfCurrentClass)
                console.log("group status: ", groupSlotInStatus(res.data.result))
                return {
                    key: String(index + 1),
                    name: className,
                    status: statusOfEachClass
                }
            })
            setTableItems(items);
        }
        return []
    }

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <Link to={`/attendance/${record.name}`}>
                        {(index + 1)}
                    </Link>
                )
            },
            width: "20%"
        },
        {
            title: 'Tên lớp',
            dataIndex: 'name',
            key: 'name',
            width: "35%"
        },
        {
            key: "status",
            title: 'Trạng thái',
            dataIndex: 'status',
            render: (status) => (
                status.map(s => (
                    <Tag color={s.status === true ? "success" : "error"}>
                        Ca {s.slot}: {s.status === true ? "Đã điểm danh" : "Chưa điểm danh"}
                    </Tag>
                ))
            )
        },
    ]

    return (
        <>
            <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%" }}>
                <h3>
                    Điểm danh {dayjs().format("DD/MM")}
                </h3>

            </div>
            <div style={{ margin: "1%" }}>
                <Table columns={columns} dataSource={tableItem} pagination={false} />
            </div>
        </>

    )
}

export default AttendancePage;