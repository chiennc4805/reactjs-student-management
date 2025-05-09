import { Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchAllStudentAttendance } from "../services/api.service";

const StudentAttendancePage = () => {

    const [tableItem, setTableItems] = useState([]);

    useEffect(() => {
        itemsInTable();
    }, [])

    const itemsInTable = async () => {
        const res = await fetchAllStudentAttendance(`date~'${dayjs().format("YYYY-MM-DD")}'`)
        if (res.data && res.data.result.length) { //res.data.result : array
            const setClassName = new Set(res.data.result.map(item => item.classInfo.name))
            const items = Array.from(setClassName).map((className, index) => ({
                key: String(index + 1),
                name: className
            }
            ))
            setTableItems(items);
        }
        return []
    }

    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <Link to={`/student-attendance/${record.name}`}>
                        {(index + 1)}
                    </Link>
                )
            }
        },
        {
            title: 'Tên lớp',
            dataIndex: 'name',
            key: 'name',
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

export default StudentAttendancePage;