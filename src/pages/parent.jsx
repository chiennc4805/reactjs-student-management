import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ParentForm from "../components/parent/create.parent.modal"
import ParentTable from "../components/parent/parent.table"
import { fetchAllParentsAPI } from "../services/api.service"

const ParentPage = () => {

    const [dataParents, setDataParents] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    const filter = useSelector((state) => state.search.parent)

    useEffect(() => {
        loadParent()
    }, [current, pageSize, filter])

    const loadParent = async () => {
        const res = await fetchAllParentsAPI(current, pageSize, filter)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataParents(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            <ParentForm
                loadParent={loadParent}
            />
            <ParentTable
                dataParents={dataParents}
                loadParent={loadParent}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
            />
        </>
    )
}

export default ParentPage;