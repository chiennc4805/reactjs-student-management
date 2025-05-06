import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, ConfigProvider, DatePicker, Divider, Result, Row, Table } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import dayjs from "dayjs";
import 'dayjs/locale/vi';
import { useEffect, useState } from 'react';

const ScheduleTable = (props) => {

    const { weekdayList, rowData, setIsFormOpen } = props

    const [columns, setColumns] = useState([])

    useEffect(() => {
        if (weekdayList) {
            onChangeMonth()
        }
    }, [weekdayList]);

    const convertWeekdayToVietnamese = (date) => {
        if (dayjs.isDayjs(date)) {
            const weekday = date.day()
            switch (weekday) {
                case 1: return "Thứ Hai"
                case 2: return "Thứ Ba"
                case 3: return "Thứ Tư"
                case 4: return "Thứ Năm"
                case 5: return "Thứ Sáu"
                case 6: return "Thứ Bảy"
                case 0: return "Chủ nhật"
            }
        }
    }

    const onChangeMonth = (date) => {
        let chosenMonth;
        let firstDayInMonth;
        let newColumns = []
        if (!date) {
            chosenMonth = dayjs().month()
            firstDayInMonth = dayjs().startOf("month")

        } else {
            chosenMonth = date.month()
            firstDayInMonth = date.startOf("month")
        }

        for (let i = firstDayInMonth; i.month() === chosenMonth; i = i.add(1, 'day')) {
            if (weekdayList?.includes(i.day())) {
                newColumns.push(
                    {
                        title: (
                            <>
                                {convertWeekdayToVietnamese(i)}
                                <Divider style={{ margin: '8px 0' }} />
                                {i.format("DD/MM")}
                            </>
                        ),
                        dataIndex: i.format("YYYY-MM-DD"),
                        key: i.format("YYYY-MM-DD"),
                        render: (text) => text || ''
                    }
                )
            }
        }

        setColumns([studentColumn, ...newColumns])

    };

    const studentColumn = {
        title: (
            <div>
                <DatePicker
                    defaultValue={dayjs()}
                    onChange={onChangeMonth}
                    picker="month"
                    format={"MM/YYYY"}
                />
            </div>
        ),
        dataIndex: 'studentName',
        key: 'studentName',
        width: 150,
        fixed: 'left',
    };

    // Thiết lập locale tiếng Việt cho dayjs
    dayjs.locale('vi');

    return (
        <ConfigProvider locale={viVN}>
            <Row style={{ margin: "1%" }}>
                <Col xs={24} style={{ width: "100vw" }}>
                    {weekdayList ?
                        <Table
                            columns={columns}
                            dataSource={rowData}
                            bordered
                            pagination={false}
                            rowKey="slot"
                            scroll={{ x: true }}
                            sticky={{ offsetHeader: 0 }}
                        />

                        :
                        <>
                            <Result
                                status="warning"
                                title="Lớp này chưa có lịch học. Vui lòng tạo mới !"
                                extra={
                                    <Button style={{ margin: "0px 10px" }}
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => setIsFormOpen(true)}
                                    >
                                        Thêm mới
                                    </Button>
                                }
                            />
                        </>
                    }
                </Col>
            </Row>
        </ConfigProvider>
    );
};

export default ScheduleTable;