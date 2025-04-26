import { useEffect, useState } from "react";
import StudentTable from "../components/student/student.table";
import { fetchAllStudentsAPI, fetchAllSubjectsAPI } from "../services/api.service";
import { notification } from "antd";
import StudentForm from "../components/student/create.student.modal";
import SubjectForm from "../components/subject/create.subject.modal";
import SubjectTable from "../components/subject/subject.table";

const SubjectPage = () => {

    const [dataSubjects, setDataSubjects] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)


    useEffect(() => {
        loadSubject()
    }, [current, pageSize])

    const loadSubject = async () => {
        const res = await fetchAllSubjectsAPI(current, pageSize)
        if (res.data) {
            if (res.data.result.length === 0) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataSubjects(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            <SubjectForm
                loadSubject={loadSubject}
            />
            <SubjectTable
                dataSubjects={dataSubjects}
                loadSubject={loadSubject}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
            />
        </>
    )
}

export default SubjectPage;