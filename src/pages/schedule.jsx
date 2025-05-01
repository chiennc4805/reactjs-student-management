import { Tag } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import ScheduleForm from '../components/schedule/create.schedule.modal';
import ScheduleTable from '../components/schedule/schedule.table';
import ViewScheduleDetail from '../components/schedule/view.schedule.modal';
import { fetchAllClassesWithoutPaginationAPI, fetchScheduleInWeek } from '../services/api.service';

const SchedulePage = () => {

    const [scheduleData, setScheduleData] = useState([]);

    const [firstDayInWeek, setFirstDayInWeek] = useState(dayjs().day(1)); // Thứ 2

    const [classOptions, setClassOptions] = useState([])

    const [scheduleDetail, setScheduleDetail] = useState(null)
    const [isDetailOpen, setIsDetailOpen] = useState(false)

    useEffect(() => {
        fetchScheduleData()
        loadClassInForm()
    }, [])

    const loadClassInForm = async () => {
        const res = await fetchAllClassesWithoutPaginationAPI()
        setClassOptions(res.data.result.map(c => ({ label: c.name, value: c.id })))
    }

    const renderScheduleItems = (items) => {
        if (!items || items.length === 0) return '';

        return (
            <>
                {items.map((item, index) => (
                    <Tag key={index} onClick={() => alert("me")} style={{ cursor: "pointer" }}>
                        {item.name}
                    </Tag>
                ))}
            </>
        );
    };

    const fetchScheduleData = async () => {

        const res = await fetchScheduleInWeek(firstDayInWeek.format("YYYY-MM-DD"))

        const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

        const data = res.data.map(rowData => {

            // Thêm dữ liệu cho mỗi ngày trong tuần
            weekdays.forEach(day => {
                // Chuyển đổi dữ liệu lịch học thành các Tag
                rowData[day] = renderScheduleItems(rowData[day]);
            });

            return rowData;
        });

        setScheduleData(data);
    };

    return (
        <>
            <ScheduleForm
                classOptions={classOptions}
                fetchScheduleData={fetchScheduleData}
            />
            <ScheduleTable
                scheduleData={scheduleData}
                setScheduleData={setScheduleData}
                fetchScheduleData={fetchScheduleData}
                firstDayInWeek={firstDayInWeek}
                setFirstDayInWeek={setFirstDayInWeek}
            />
            <ViewScheduleDetail />
        </>
    )
};

export default SchedulePage;