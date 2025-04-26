import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, notification, Popconfirm, Row, Table, Tag } from 'antd';
import { useState } from 'react';
import { deleteSubjectAPI, deleteTeacherAPI } from '../../services/api.service';
import ViewTeacherDetail from './view.teacher.drawer';
import UpdateTeacherModal from './update.teacher.modal';


const TeacherTable = (props) => {

    const colors = ['magenta', 'red', 'volcano', 'orange', 'gold', 'lime', 'green', 'cyan', 'blue', 'geekblue', 'purple'];


    const [api, contextHolder] = notification.useNotification();

    const { dataTeachers, loadTeacher, pageSize, setPageSize,
        current, setCurrent, total, subjectOptions } = props

    const [teacherDetail, setTeacherDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [dataUpdate, setDataUpdate] = useState(null)
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const handleDeleteTeacher = async (id) => {
        const res = await deleteTeacherAPI(id)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Xoá giáo viên thành công')
            await loadTeacher()
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message))
        }
    }

    const columns = [
        //STT
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
        //ID
        {
            title: 'ID',
            dataIndex: 'id',
            render: (_, record) => {
                return (
                    <a href='#'
                        onClick={() => {
                            setTeacherDetail(record)
                            setIsDetailOpen(true);
                        }}
                    >
                        {record.id}
                    </a>
                )
            }
        },
        //Họ và tên
        {
            title: 'Họ và tên',
            dataIndex: 'name',
        },
        // {
        //     title: 'Giới tính',
        //     dataIndex: 'gender',
        //     render: (_, record) => {
        //         return (
        //             <span>
        //                 {record.gender ? "Nam" : "Nữ"}
        //             </span>
        //         )
        //     }
        // },
        // {
        //     title: 'Ngày sinh',
        //     dataIndex: 'birthDate',
        // },

        //Số điện thoại
        {
            title: 'Số điện thoại',
            dataIndex: 'telephone',
        },
        {
            title: 'Chuyên môn',
            dataIndex: 'subjects',
            render: (subjects) => (
                <>
                    {subjects.map(subject => {
                        const color = colors[Math.floor(Math.random() * colors.length)];
                        return (
                            <Tag color={color} key={subject.id}>
                                {subject.name}
                            </Tag>
                        );
                    })}
                </>
            )
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
                        title="Xoá giáo viên"
                        description="Bạn chắc chắn xoá giáo viên này?"
                        onConfirm={() => handleDeleteTeacher(record.id)}
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
                        dataSource={dataTeachers}
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

            <ViewTeacherDetail
                isDetailOpen={isDetailOpen}
                setIsDetailOpen={setIsDetailOpen}
                teacherDetail={teacherDetail}
            />

            <UpdateTeacherModal
                loadTeacher={loadTeacher}
                isUpdateFormOpen={isUpdateFormOpen}
                setIsUpdateFormOpen={setIsUpdateFormOpen}
                dataUpdate={dataUpdate}
                setDataUpdate={setDataUpdate}
                subjectOptions={subjectOptions}
            />
        </>

    )

}

export default TeacherTable;