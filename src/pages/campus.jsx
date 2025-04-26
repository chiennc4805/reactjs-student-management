import { useEffect, useState } from "react";
import { fetchAllCampusAPI } from "../services/api.service";
import CampusForm from "../components/campus/create.campus.modal";
import CampusTable from "../components/campus/campus.table";

const CampusPage = () => {

    const [dataCampus, setDataCampus] = useState(null)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)


    useEffect(() => {
        loadCampus()
    }, [current, pageSize])

    const loadCampus = async () => {
        const res = await fetchAllCampusAPI(current, pageSize)
        if (res.data) {
            if (res.data.result.length === 0) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataCampus(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            <>
                <CampusForm
                    loadCampus={loadCampus}
                />
                <CampusTable
                    dataCampus={dataCampus}
                    loadCampus={loadCampus}
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

export default CampusPage;