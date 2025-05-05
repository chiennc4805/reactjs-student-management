import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StudentForm from "../components/student/create.student.modal";
import StudentTable from "../components/student/student.table";
import { fetchAllClassesWithoutPaginationAPI, fetchAllStudentsAPI } from "../services/api.service";

const StudentPage = () => {

    const [dataStudents, setDataStudents] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [classOptions, setClassOptions] = useState([])

    const filter = useSelector((state) => state.search.student)

    console.log("filter: ", filter)

    useEffect(() => {
        loadStudent()
    }, [current, pageSize, filter])

    useEffect(() => {
        loadClassInForm()
    }, [])

    const loadClassInForm = async () => {
        const res = await fetchAllClassesWithoutPaginationAPI()
        setClassOptions(res.data.result.map(c => ({ label: c.name, value: c.id })))
    }

    const loadStudent = async () => {
        const res = await fetchAllStudentsAPI(current, pageSize, filter)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
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
                classOptions={classOptions}
            />
            <StudentTable
                dataStudents={dataStudents}
                loadStudent={loadStudent}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                classOptions={classOptions}
            />
        </>
    )
}

export default StudentPage;