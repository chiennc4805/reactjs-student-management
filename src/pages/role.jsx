import { useEffect, useState } from "react";
import RoleForm from "../components/role/create.role.modal";
import RoleTable from "../components/role/role.table";
import { fetchAllRolesAPI } from "../services/api.service";

const RolePage = () => {

    const [dataRoles, setDataRoles] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        loadRole()
    }, [current, pageSize])

    const loadRole = async () => {
        const res = await fetchAllRolesAPI(current, pageSize)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(current - 1)
            }
            setDataRoles(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    return (
        <>
            <RoleForm
                loadRole={loadRole}
            />
            <RoleTable
                dataRoles={dataRoles}
                loadRole={loadRole}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
            />
        </>
    )
}

export default RolePage;