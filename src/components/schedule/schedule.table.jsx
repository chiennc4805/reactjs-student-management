import { Col, ConfigProvider, DatePicker, Divider, Row, Table } from 'antd';
import viVN from 'antd/es/locale/vi_VN';
import dayjs from "dayjs";
import 'dayjs/locale/vi';
import { useEffect } from 'react';

const SchedulePage = (props) => {

    const { scheduleData, fetchScheduleData, firstDayInWeek, setFirstDayInWeek } = props

    useEffect(() => {
        fetchScheduleData();
    }, [firstDayInWeek]);

    const onChangeWeek = (date) => {
        if (!date) {
            setFirstDayInWeek(dayjs().day(1));
        } else {
            const firstDay = dayjs(date.$d).day(1);
            setFirstDayInWeek(firstDay);
        }
    };

    const generateColumns = () => {

        const slotColumn = {
            title: (
                <div>
                    <DatePicker
                        defaultValue={firstDayInWeek}
                        onChange={onChangeWeek}
                        picker="week"
                        showWeek={false}
                    />
                </div>
            ),
            dataIndex: 'slot',
            key: 'slot',
            width: 150,
            fixed: 'left',
        };

        const weekdays = [
            { day: 'Thứ 2', dataIndex: 'monday' },
            { day: 'Thứ 3', dataIndex: 'tuesday' },
            { day: 'Thứ 4', dataIndex: 'wednesday' },
            { day: 'Thứ 5', dataIndex: 'thursday' },
            { day: 'Thứ 6', dataIndex: 'friday' },
            { day: 'Thứ 7', dataIndex: 'saturday' },
            { day: 'Chủ nhật', dataIndex: 'sunday' }
        ];

        const dayColumns = weekdays.map((weekday, index) => {
            // Lấy ngày tương ứng (thêm index ngày vào firstDayInWeek)
            const currentDay = dayjs(firstDayInWeek).add(index, 'day');

            return {
                title: (
                    <>
                        {weekday.day}
                        <Divider style={{ margin: '8px 0' }} />
                        {currentDay.format("DD/MM")}
                    </>
                ),
                dataIndex: weekday.dataIndex,
                key: weekday.dataIndex,
                render: (text) => text || '',
            };
        });

        return [slotColumn, ...dayColumns];
    };

    // Thiết lập locale tiếng Việt cho dayjs
    dayjs.locale('vi');

    return (
        <ConfigProvider locale={viVN}>
            <Row style={{ margin: "1%" }}>
                <Col xs={24} style={{ width: "100vw" }}>
                    <Table
                        columns={generateColumns()}
                        dataSource={scheduleData}
                        bordered
                        pagination={false}
                        rowKey="slot"
                        scroll={{ x: true }}
                    />
                </Col>
            </Row>
        </ConfigProvider>
    );
};

export default SchedulePage;