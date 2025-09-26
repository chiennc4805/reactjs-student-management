import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, notification, Popconfirm, Row, Table } from 'antd';
import dayjs from "dayjs";
import { useState } from 'react';
import { deleteParentAPI } from '../../services/api.service';
import UpdateParentModal from './update.parent.modal';
import ViewParentDetail from './view.parent.drawer';


const ParentTable = (props) => {

    const [api, contextHolder] = notification.useNotification();

    const { dataParents, loadParent, pageSize, setPageSize,
        current, setCurrent, total } = props

    const [parentDetail, setParentDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const handleDeleteParent = async (id) => {
        const res = await deleteParentAPI(id)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Xoá phụ huynh thành công')
            await loadParent()
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
                    <a href='#'
                        onClick={() => {
                            setParentDetail(record)
                            setIsDetailOpen(true);
                        }}
                    >
                        {(index + 1) + (current - 1) * 10}
                    </a>
                )
            },
            width: "10%"
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthDate',
            render: (birthDate) => (
                <span>
                    {dayjs(birthDate).format("DD-MM-YYYY")}
                </span>
            ),
            width: "13%"
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'telephone',
            width: "15%"
        },
        {
            title: 'Tên Zalo',
            dataIndex: 'zaloName',
            width: "15%"
        },
        {
            title: 'Tên Facebook',
            dataIndex: 'facebookName',
            width: "15%"
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => ( //record là bản ghi (record tương ứng với dòng dữ liệu)
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined style={{ cursor: "pointer", color: "orange" }}
                        onClick={() => {
                            setIsUpdateFormOpen(true)
                            setDataUpdate(record)
                        }} />

                    <Popconfirm
                        title="Xoá phụ huynh"
                        description="Bạn chắc chắn xoá phụ huynh này?"
                        onConfirm={() => handleDeleteParent(record.id)}
                        okText="Yes"
                        cancelText="No"
                        placement='left'
                    >
                        <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
                    </Popconfirm>
                </div>
            ),
            width: "10%"
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
                        dataSource={dataParents}
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

            <ViewParentDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                parentDetail={parentDetail}
            />
            <UpdateParentModal
                loadParent={loadParent}
                isUpdateFormOpen={isUpdateFormOpen}
                setIsUpdateFormOpen={setIsUpdateFormOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>

    )

}

export default ParentTable;