import { useEffect, useState } from "react";
import StudentFeeTable from "../components/fee/student.fee.table";
import { fetchAllCampusAPI } from "../services/api.service";

const StudentFeePage = () => {

    const [dataStudentFee, setDataStudentFee] = useState(null)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)


    useEffect(() => {
        loadStudentFee()
    }, [current, pageSize])

    const loadStudentFee = async () => {
        const res = await fetchAllCampusAPI(current, pageSize)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataStudentFee(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            <>
                <StudentFeeTable
                    dataStudentFee={dataStudentFee}
                    loadStudentFee={loadStudentFee}
                    current={current}
                    setCurrent={setCurrent}
                    pageSize={pageSize}
                    setPageSize={setPageSize}
                    total={total}
                />
            </>
        </>
    )
}

export default StudentFeePage;