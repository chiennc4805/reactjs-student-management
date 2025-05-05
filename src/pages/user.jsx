import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import UserForm from "../components/user/create.user.modal";
import UserTable from "../components/user/user.table";
import { fetchAllRolesAPI, fetchAllUsersAPI } from "../services/api.service";

const UserPage = () => {

    const [dataUsers, setDataUsers] = useState()
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [roleOptions, setRoleOptions] = useState(null)

    const filter = useSelector((state) => state.search.user)

    useEffect(() => {
        loadUser()
        loadRoleOption()
    }, [current, pageSize, filter])

    const loadUser = async () => {
        const res = await fetchAllUsersAPI(current, pageSize, filter)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataUsers(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    const loadRoleOption = async () => {
        const res = await fetchAllRolesAPI(1, 100)
        if (res.data) {
            const data = res.data.result.map(item => ({ label: item.name, value: item.id }))
            setRoleOptions(data)
        }
    }

    return (
        <>
            <UserForm
                loadUser={loadUser}
                roleOptions={roleOptions}
            />
            <UserTable
                dataUsers={dataUsers}
                loadUser={loadUser}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
                roleOptions={roleOptions}
            />
        </>
    )
}

export default UserPage;