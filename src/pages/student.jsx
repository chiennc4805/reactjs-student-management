import { useEffect, useState } from "react";
import StudentTable from "../components/student/student.table";
import { fetchAllStudentsAPI } from "../services/api.service";
import { notification } from "antd";
import StudentForm from "../components/student/create.student.modal";

const StudentPage = () => {

    const [dataStudents, setDataStudents] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)


    useEffect(() => {
        loadStudent()
    }, [current, pageSize])

    const loadStudent = async () => {
        const res = await fetchAllStudentsAPI(current, pageSize)
        if (res.data) {
            if (res.data.result.length === 0) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataStudents(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            <StudentForm
                loadStudent={loadStudent}
            />
            <StudentTable
                dataStudents={dataStudents}
                loadStudent={loadStudent}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
            />
        </>
    )
}

export default StudentPage;