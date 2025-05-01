import { useEffect, useState } from "react";
import ClassTable from "../components/class/class.table";
import ClassForm from "../components/class/create.class.modal";
import { fetchAllCampusWithoutPaginationAPI, fetchAllClassesAPI, fetchAllSubjectsWithoutPaginationAPI } from "../services/api.service";

const ClassPage = () => {

    const [dataClasses, setDataClasses] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    const [campusOptions, setCampusOptions] = useState([])
    const [subjectOptions, setSubjectOptions] = useState([])


    useEffect(() => {
        loadClass()
    }, [current, pageSize])

    useEffect(() => {
        loadDataInForm()
    }, [])

    const loadDataInForm = async () => {
        //load campus 
        const campus = await fetchAllCampusWithoutPaginationAPI()
        if (campus.data) {
            setCampusOptions(campus.data.result.map(x => ({ label: x.name, value: x.id })))
        }

        //load subject
        const subject = await fetchAllSubjectsWithoutPaginationAPI()
        if (subject.data) {
            setSubjectOptions(subject.data.result.map(x => ({ label: x.name, value: x.id })))
        }
    }

    const loadClass = async () => {
        const res = await fetchAllClassesAPI(current, pageSize)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(current - 1)
            }
            setDataClasses(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            <ClassForm
                loadClass={loadClass}
                campusOptions={campusOptions}
                subjectOptions={subjectOptions}
            />
            <ClassTable
                dataClasses={dataClasses}
                loadClass={loadClass}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                campusOptions={campusOptions}
                subjectOptions={subjectOptions}
            />
        </>
    )
}

export default ClassPage;