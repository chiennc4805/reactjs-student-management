import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, notification, Popconfirm, Row, Table, Tag } from 'antd';
import { useState } from 'react';
import { deleteRoleAPI } from '../../services/api.service';
import UpdateRoleModal from './update.role.modal';


const RoleTable = (props) => {

    const [api, contextHolder] = notification.useNotification();

    const { dataRoles, loadRole, pageSize, setPageSize,
        current, setCurrent, total, listAllPermissions } = props

    const [dataUpdate, setDataUpdate] = useState(null)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const handleDeleteRole = async (id) => {
        const res = await deleteRoleAPI(id)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Xoá vai trò thành công')
            await loadRole()
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
            title: 'ID',
            dataIndex: 'id',
            render: (id) => {
                return (
                    <span>
                        {id}
                    </span>
                )
            }
        },
        {
            title: 'Tên vai trò',
            dataIndex: 'name',
        },
        {
            title: 'Miêu tả',
            dataIndex: 'description',
        },
        {
            title: 'Trạng thái',
            render: (active) => {
                return (
                    <Tag color={active ? "success" : "failure"}>{active ? "ACTIVE" : "INACTIVE"}</Tag>
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
                        title="Xoá vai trò"
                        description="Bạn chắc chắn xoá vai trò này?"
                        onConfirm={() => handleDeleteRole(record.id)}
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

        //nếu thay đổi tổng số phần tử: pageSize
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
                        dataSource={dataRoles}
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

            <UpdateRoleModal
                loadRole={loadRole}
                isUpdateFormOpen={isUpdateFormOpen}
                setIsUpdateFormOpen={setIsUpdateFormOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                listAllPermissions={listAllPermissions}
            />
        </>

    )

}

export default RoleTable;