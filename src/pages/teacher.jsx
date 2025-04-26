
import { useEffect, useState } from "react";
import { fetchAllSubjectsWithoutPaginationAPI, fetchAllTeachersAPI } from "../services/api.service";
import TeacherForm from "../components/teacher/create.teacher.modal";
import TeacherTable from "../components/teacher/teacher.table";

const TeacherPage = () => {

    const [dataTeachers, setDataTeachers] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    const [subjectOptions, setSubjectOptions] = useState([])

    useEffect(() => {
        loadSubjectInForm()
    }, [])

    useEffect(() => {
        loadTeacher()
    }, [current, pageSize])

    const loadSubjectInForm = async () => {
        const res = await fetchAllSubjectsWithoutPaginationAPI()
        if (res.data) {
            setSubjectOptions(res.data.result.map(x => ({ label: x.name, value: x.id })))
        }
    }

    const loadTeacher = async () => {
        const res = await fetchAllTeachersAPI(current, pageSize)
        if (res.data) {
            if (res.data.result.length === 0) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataTeachers(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            <TeacherForm
                loadTeacher={loadTeacher}
                subjectOptions={subjectOptions}
            />
            <TeacherTable
                dataTeachers={dataTeachers}
                loadTeacher={loadTeacher}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                subjectOptions={subjectOptions}
            />
        </>
    )
}

export default TeacherPage;