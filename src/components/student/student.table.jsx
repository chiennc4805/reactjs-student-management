import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, notification, Popconfirm, Row, Table, Tag } from 'antd';
import dayjs from "dayjs";
import { useState } from 'react';
import { deleteStudentAPI } from '../../services/api.service';
import UpdateStudentModal from './update.student.modal';
import ViewStudentDetail from './view.student.drawer';


const StudentTable = (props) => {

    const [api, contextHolder] = notification.useNotification();

    const { dataStudents, loadStudent, pageSize, setPageSize,
        current, setCurrent, total } = props

    const [studentDetail, setStudentDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const handleDeleteStudent = async (id) => {
        const res = await deleteStudentAPI(id)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Xoá học sinh thành công')
            await loadStudent()
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
                    <a href='#'
                        onClick={() => {
                            setStudentDetail(record)
                            setIsDetailOpen(true);
                        }}
                    >
                        {record.id}
                    </a>
                )
            }
        },
        {
            title: 'Họ và tên',
            dataIndex: 'name',
        },
        {
            title: 'Giới tính',
            dataIndex: 'gender',
            render: (_, record) => {
                return (
                    <span>
                        {record.gender ? "Nam" : "Nữ"}
                    </span>
                )
            }
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthDate',
            render: (birthDate) => (
                <span>
                    {dayjs(birthDate).format("DD-MM-YYYY")}
                </span>
            )
        },
        {
            title: 'Lớp học',
            dataIndex: 'classes',
            render: (classes) => (
                <>
                    {classes.map(c => {
                        return (
                            <Tag>{c.name}</Tag>
                        );
                    })}
                </>
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
                        title="Xoá học sinh"
                        description="Bạn chắc chắn xoá học sinh này?"
                        onConfirm={() => handleDeleteStudent(record.id)}
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
                        dataSource={dataStudents}
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

            <ViewStudentDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                studentDetail={studentDetail}
            />
            <UpdateStudentModal
                loadStudent={loadStudent}
                isUpdateFormOpen={isUpdateFormOpen}
                setIsUpdateFormOpen={setIsUpdateFormOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
            />
        </>

    )

}

export default StudentTable;