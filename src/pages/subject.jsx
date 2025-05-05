import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SubjectForm from "../components/subject/create.subject.modal";
import SubjectTable from "../components/subject/subject.table";
import { fetchAllSubjectsAPI } from "../services/api.service";

const SubjectPage = () => {

    const [dataSubjects, setDataSubjects] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    const filter = useSelector((state) => state.search.subject)

    useEffect(() => {
        loadSubject()
    }, [current, pageSize, filter])

    const loadSubject = async () => {
        const res = await fetchAllSubjectsAPI(current, pageSize, filter)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
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