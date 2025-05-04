import { Breadcrumb, Col, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchAllClassEnrollmentAPIWithoutPagination } from "../../services/api.service";

const ClassDetailPage = () => {

    const { name } = useParams()

    const [dataStudent, setDataStudent] = useState(null)

    useEffect(() => {
        const loadStudentInClass = async () => {
            if (!dataStudent) {
                const res = await fetchAllClassEnrollmentAPIWithoutPagination(`enrollmentClass.name~'${name}'`)
                if (res.data) {
                    setDataStudent(res.data.result.map(x => x.enrollmentStudent))
                }
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
            dataIndex: 'name',
        },
        {
            key: "gender",
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
            key: 'height',
            title: 'Chiều cao (cm)',
            dataIndex: 'height',
        },
        {
            key: 'weight',
            title: 'Cân nặng (kg)',
            dataIndex: 'weight',
        },
    ];


    return (
        <>
            <Row style={{ margin: "1%" }}>
                <Col xs={24} style={{ width: "100vw" }}>
                    <Breadcrumb
                        items={[
                            {
                                title: <Link to="/class" style={{ marginTop: "2px" }}>Danh sách lớp học</Link>,
                            },
                            {
                                title: <h3>{name}</h3>,
                            },
                        ]}
                        style={{ marginBottom: "20px" }}
                    />
                    <Table columns={columns} dataSource={dataStudent} />
                </Col>
            </Row>

        </>
    )
}

export default ClassDetailPage;