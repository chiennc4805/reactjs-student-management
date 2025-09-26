import { Col, Row, Table, Tag } from 'antd';

const StudentFeeTable = (props) => {

    const { dataStudentFee, pageSize, setPageSize,
        current, setCurrent, total } = props

    const formatterNumber = (val) => {
        if (!val) return "0";
        return Number(val).toLocaleString("en-US");
    };

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
            },
            width: "10%"
        },
        {
            title: 'Họ và tên',
            render: (_, record) => {
                return (
                    <span>
                        {record.student.name}
                    </span>
                )
            },
            width: "25%"
        },
        {
            title: 'Tháng',
            render: (_, record) => {
                return (
                    <span>
                        {record.month}
                    </span>
                )
            },
            width: "10%"
        },
        {
            title: 'Số buổi học',
            render: (_, record) => {
                return (
                    record.feeOfEachClass.length === 1 ? (
                        <Tag>
                            {record.totalAttendedDay}/{record.totalDay}
                        </Tag>
                    ) : (
                        record.feeOfEachClass.map(item => (
                            <Tag>{item.className}: {item.classAttendedDay}/{item.classTotalDay}</Tag>
                        ))
                    )
                )
            },
            width: "25%"
        },
        {
            title: 'Học phí (đồng)',
            render: (_, record) => {
                return (
                    record.feeOfEachClass.length === 1 ? (
                        <Tag>
                            {formatterNumber(record.totalFee)}
                        </Tag>
                    ) : (
                        record.feeOfEachClass.map(item => (
                            <Tag>{item.className}: {formatterNumber(item.fee)}</Tag>
                        ))
                    )
                )
            }
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
            <Row style={{ margin: "1%" }}>
                <Col xs={24} style={{ width: "100vw" }}>
                    <Table
                        rowKey={"id"}
                        columns={columns}
                        dataSource={dataStudentFee}
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
        </>

    )

}

export default StudentFeeTable;