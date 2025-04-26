import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, notification, Popconfirm, Row, Space, Table, Tag } from 'antd';
import { useState } from 'react';
import { deleteStudentAPI, deleteSubjectAPI } from '../../services/api.service';
import UpdateSubjectModal from './update.subject.modal';


const SubjectTable = (props) => {

    const [api, contextHolder] = notification.useNotification();

    const { dataSubjects, loadSubject, pageSize, setPageSize,
        current, setCurrent, total } = props

    const [dataUpdate, setDataUpdate] = useState(null)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const handleDeleteSubject = async (id) => {
        const res = await deleteSubjectAPI(id)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Xoá môn học thành công')
            await loadSubject()
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
            render: (_, record) => {
                return (
                    <span>
                        {record.id}
                    </span>
                )
            }
        },
        {
            title: 'Tên môn học',
            dataIndex: 'name',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'pricePerDay',
        },
        {
            title: 'Tiền lương',
            dataIndex: 'salaryPerDay',
        },
        {
            title: 'Trạng thái',
            //dataIndex: 'birthDate',
            render: (_, record) => {
                return (
                    <Tag color="success">ACTIVE</Tag>
                )
            }
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
                        title="Xoá môn học"
                        description="Bạn chắc chắn xoá môn học này?"
                        onConfirm={() => handleDeleteSubject(record.id)}
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

    const onChange = (pagination, filters, sorter, extra) => { //các tham số trên antd cung cấp sẵn
        //setCurrent, setPageSize
        //nếu thay đổi trang: current
        if (pagination && pagination.current) {
            if (+pagination.current !== +current) {
                setCurrent(+pagination.current) //convert về number
            }
        }

        //nếu thay đổi tổng số phần tử: pageSize
        if (pagination && pagination.pageSize) {
            if (+pagination.pageSize !== +pageSize) {
                setPageSize(+pagination.pageSize) //convert về number
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
                        dataSource={dataSubjects}
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

            <UpdateSubjectModal
                loadSubject={loadSubject}
                isUpdateFormOpen={isUpdateFormOpen}
                setIsUpdateFormOpen={setIsUpdateFormOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>

    )

}

export default SubjectTable;