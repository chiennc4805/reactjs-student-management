import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, notification, Popconfirm, Row, Table } from 'antd';
import { useState } from 'react';
import { deleteUserAPI } from '../../services/api.service';
import UpdateUserModal from './update.user.modal';


const UserTable = (props) => {

    const [api, contextHolder] = notification.useNotification();

    const { dataUsers, loadUser, pageSize, setPageSize,
        current, setCurrent, total, roleOptions } = props

    const [dataUpdate, setDataUpdate] = useState(null)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const handleDeleteUser = async (id) => {
        const res = await deleteUserAPI(id)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Xoá nguời dùng thành công')
            await loadUser()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }
    }

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (_, record, index) => {
                return (
                    <span>
                        {(index + 1) + (current - 1) * 10}
                    </span>
                )
            }
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
        },
        {
            title: 'Tài khoản',
            dataIndex: 'username',
        },
        {
            title: 'Vai trò',
            render: (record) => {
                return (
                    <span>
                        {record.role.name}
                    </span>
                )
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setIsUpdateFormOpen(true)
                            setDataUpdate(record)
                        }} />

                    <Popconfirm
                        title="Xoá nguời dùng"
                        description="Bạn chắc chắn xoá nguời dùng này?"
                        onConfirm={() => handleDeleteUser(record.id)}
                        okText="Có"
                        cancelText="Không"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current)
            }
        }

        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize)
            }
        }
    };


    return (
        <>
            {contextHolder}

            <Row style={{ margin: "1%" }}>
                <Col xs={24} style={{ width: "100vw" }}>
                    <Table
                        rowKey={"id"}
                        columns={columns}
                        dataSource={dataUsers}
                        bordered={true}
                        size='large'
                        pagination={
                            {
                                current: current,
                                pageSize: pageSize,
                                showSizeChanger: true,
                                total: total,
                                showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} trên {total} rows</div>) }
                            }}
                        onChange={onChange}
                    />
                </Col>
            </Row>

            <UpdateUserModal
                loadUser={loadUser}
                isUpdateFormOpen={isUpdateFormOpen}
                setIsUpdateFormOpen={setIsUpdateFormOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                roleOptions={roleOptions}
            />
        </>

    )

}

export default UserTable;