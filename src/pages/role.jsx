import { useEffect, useState } from "react";
import RoleForm from "../components/role/create.role.modal";
import RoleTable from "../components/role/role.table";
import { fetchAllPermissionsAPI, fetchAllRolesAPI } from "../services/api.service";

const RolePage = () => {

    const [dataRoles, setDataRoles] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [listPermissions, setListPermissions] = useState(null);

    useEffect(() => {
        loadRole()
    }, [current, pageSize])

    useEffect(() => {
        const init = async () => {
            const res = await fetchAllPermissionsAPI(1, 100)
            setListPermissions(groupByPermission(res.data.result))
        }
        init()
    }, [])

    const groupByPermission = (data) => {
        const groupedData = data.reduce((acc, item) => {
            acc[item.module] = acc[item.module] || [];
            acc[item.module].push(item);
            return acc;
        }, {});
        return Object.keys(groupedData).map((key) => ({
            module: key,
            permissions: groupedData[key],
        }));
    };

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
                listPermissions={listPermissions}
            />
            <RoleTable
                dataRoles={dataRoles}
                loadRole={loadRole}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                listPermissions={listPermissions}
            />
        </>
    )
}

export default RolePage;