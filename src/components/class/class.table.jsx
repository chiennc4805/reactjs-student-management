import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, notification, Popconfirm, Row, Table, Tag } from 'antd';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { deleteClassAPI } from '../../services/api.service';
import UpdateClassModal from './update.class.modal';


const ClassTable = (props) => {

    const [api, contextHolder] = notification.useNotification();

    const { dataClasses, loadClass, pageSize, setPageSize,
        current, setCurrent, total, campusOptions, subjectOptions } = props

    const [dataUpdate, setDataUpdate] = useState(null)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const handleDeleteClass = async (id) => {
        const res = await deleteClassAPI(id)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Xoá lớp học thành công')
            await loadClass()
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
                    <Link to={`/class/${record.name}`}>
                        {(index + 1) + (current - 1) * 10}
                    </Link>
                )
            },
            width: "6%"
        },
        {
            title: 'Tên lớp học',
            dataIndex: 'name',
            width: "20%"
        },
        {
            title: 'Dạy môn',
            dataIndex: 'subject',
            render: (subject) => (
                <Tag>
                    {subject.name}
                </Tag>
            )
        },
        {
            title: 'Giáo viên',
            dataIndex: 'teacher',
            render: (teacher) => (
                <Tag>
                    {teacher.name} - {teacher.telephone}
                </Tag>
            )
        },
        {
            title: 'Cơ sở',
            dataIndex: 'campus',
            render: (campus) => (
                <Tag>
                    {campus.name}
                </Tag>
            )
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
                        title="Xoá lớp học"
                        description="Bạn chắc chắn xoá lớp học này?"
                        onConfirm={() => handleDeleteClass(record.id)}
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
                        dataSource={dataClasses}
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

            <UpdateClassModal
                loadClass={loadClass}
                isUpdateFormOpen={isUpdateFormOpen}
                setIsUpdateFormOpen={setIsUpdateFormOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                campusOptions={campusOptions}
                subjectOptions={subjectOptions}
            />
        </>

    )

}

export default ClassTable;