
import { Breadcrumb, Col, Row, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ViewSlotStudentAttendancePage = () => {

    const { className } = useParams()

    const [dataSlot, setDataSlot] = useState(null)

    useEffect(() => {
        const loadStudentInClass = async () => {
            if (!dataSlot) {

            }
        }
        loadStudentInClass()
    })

    const columns = [
        {
            title: 'STT',
            dataIndex: 'stt',
            render: (_, record, index) => {
                return (
                    <span>
                        {(index + 1)}
                    </span>
                )
            },
            width: "6%"
        },
        {
            key: 'name',
            title: 'Name',
            render: (_, record) => {
                return (
                    <span>
                        {record.enrollmentStudent?.className || ""}
                    </span>
                )
            }
        },
        {
            key: "gender",
            title: 'Giới tính',
            render: (_, record) => {
                return (
                    <span>
                        {record.enrollmentStudent?.gender ? "Nam" : "Nữ"}
                    </span>
                )
            }
        },
        {
            key: 'height',
            title: 'Chiều cao (cm)',
            render: (_, record) => {
                return (
                    <span>
                        {record.enrollmentStudent?.height}
                    </span>
                )
            }
        },
        {
            key: 'weight',
            title: 'Cân nặng (kg)',
            render: (_, record) => {
                return (
                    <span>
                        {record.enrollmentStudent?.weight}
                    </span>
                )
            }
        },
        {
            key: 'date',
            title: 'Ngày vào lớp',
            dataIndex: 'date',
            render: (_, record) => {
                return (
                    <span>
                        {record.date ? dayjs(record.date).format("DD-MM-YYYY") : ""}
                    </span>
                )
            }
        },
    ];


    return (
        <>
            <Row style={{ margin: "1%" }}>
                <Col xs={24} style={{ width: "100vw" }}>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link to="/student-attendance" style={{ marginTop: "2px" }}>Điểm danh {dayjs().format("DD/MM")}</Link>,
                            },
                            {
                                title: <h3>{className}</h3>,
                            },
                        ]}
                        style={{ marginBottom: "20px" }}
                    />
                    <Table columns={columns} dataSource={dataSlot} pagination={false} />
                </Col>
            </Row>

        </>
    )
}

export default ViewSlotStudentAttendancePage;