import { CheckOutlined, CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, ConfigProvider, DatePicker, Divider, Result, Row, Table } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import dayjs from "dayjs";
import 'dayjs/locale/vi';
import { useEffect, useState } from 'react';
import { fetchAllStudentAttendance } from '../../services/api.service';

const ScheduleTable = (props) => {

    const { weekdayList, rowData, setIsFormOpen, classData, setRowData } = props

    const [columns, setColumns] = useState([])

    useEffect(() => {
        if (weekdayList) {
            console.log("rowData first time: ", rowData)
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

    const onChangeMonth = async (date) => {
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
                newColumns.push({
                    title: (
                        <>
                            {convertWeekdayToVietnamese(i)}
                            <Divider style={{ margin: '8px 0' }} />
                            {i.format("DD/MM")}
                        </>
                    ),
                    dataIndex: i.format("YYYY-MM-DD"),
                    key: i.format("YYYY-MM-DD"),
                    render: (text) => {
                        return (
                            <>
                                {text && text.map((i, index) => (
                                    <span key={index}>{i ? <CheckOutlined /> : <CloseOutlined />}</span>
                                ))}
                            </>
                        );
                    }
                });
            }
        }
        setColumns([studentColumn, ...newColumns]);

        const daysToFetch = [];
        for (let i = firstDayInMonth; i.month() === chosenMonth; i = i.add(1, 'day')) {
            if (weekdayList?.includes(i.day()) && dayjs().isSameOrAfter(i, 'day')) {
                daysToFetch.push(i.clone());
            }
        }

        let newRowData = [...rowData];

        for (const day of daysToFetch) {
            const dateString = day.format('YYYY-MM-DD');

            const res = await fetchAllStudentAttendance(`date='${dateString}' and classInfo.name='${classData?.name}'`);

            if (res.data && res.data.result.length) {
                const data = res.data.result.filter(item => item.statusOfClass === true);
                if (data.length === 0) {
                    continue;
                }

                newRowData = newRowData.map(row => {
                    const statusOfSlot = data
                        .filter(x => x.student.id === row.sId)
                        .sort((a, b) => a.slot - b.slot)
                        .map(x => x.status);

                    if (statusOfSlot.length > 0) {
                        return {
                            ...row,
                            [dateString]: statusOfSlot
                        };
                    }
                    return row;
                });
            }
        }
        setRowData(newRowData);
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