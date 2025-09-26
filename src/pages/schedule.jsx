import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ScheduleForm from '../components/schedule/create.schedule.modal';
import ScheduleTable from '../components/schedule/schedule.table';
import { fetchClassByName } from '../services/api.service';

const SchedulePage = () => {

    const { name } = useParams()

    const [classData, setClassData] = useState(null)
    const [weekdayList, setWeekdayList] = useState(null)
    const [rowData, setRowData] = useState([])
    const [isFormOpen, setIsFormOpen] = useState(false)

    useEffect(() => {
        fetchScheduleData()
    }, [name])


    const fetchScheduleData = async () => {
        setWeekdayList(null);
        setRowData(null);

        const res = await fetchClassByName(name)
        if (res.data) {
            console.log("res data: ", res.data)
            if (res.data.schedule) {
                const data = res.data.students.map(s => (
                    {
                        sId: s.id,
                        studentName: s.name,
                    }
                ))
                data.push({ tId: res.data.teacher.id, teacherName: `${res.data.teacher.name} (giáo viên)` })
                console.log("row data: ", data)
                setWeekdayList(res.data.schedule.weekdayList)
                setRowData(data);

            }
            setClassData(res.data)
        }
    };

    return (
        <>
            <ScheduleForm
                fetchScheduleData={fetchScheduleData}
                classData={classData}
                weekdayList={weekdayList}
                isFormOpen={isFormOpen}
                setIsFormOpen={setIsFormOpen}
            />
            <ScheduleTable
                weekdayList={weekdayList}
                rowData={rowData}
                setIsFormOpen={setIsFormOpen}
                classData={classData}
                setRowData={setRowData}
            />
        </>
    )
};

export default SchedulePage;