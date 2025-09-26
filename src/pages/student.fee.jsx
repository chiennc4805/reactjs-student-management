import { DownloadOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, DatePicker, message } from "antd";
import viVN from 'antd/es/locale/vi_VN';
import dayjs from "dayjs";
import 'dayjs/locale/vi';
import { useEffect, useState } from "react";
import StudentFeeTable from "../components/fee/student.fee.table";
import { exportStudentFeeToExcel, fetchAllStudentFee } from "../services/api.service";

const StudentFeePage = () => {

    const [dataStudentFee, setDataStudentFee] = useState(null)
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)
    const [chosenMonth, setChosenMonth] = useState(dayjs().month() + 1)

    useEffect(() => {
        loadStudentFee()
    }, [current, pageSize, chosenMonth])

    const loadStudentFee = async () => {
        const res = await fetchAllStudentFee(current, pageSize, `month:${chosenMonth}`)
        if (res.data) {
            if (res.data.result.length === 0 && current > 1) {
                setCurrent(res.data.meta.page - 1)
            } else {
                setCurrent(res.data.meta.page)
            }
            setDataStudentFee(res.data.result)
            setPageSize(res.data.meta.pageSize)
            setTotal(res.data.meta.total)
        }
    }

    const onChangeMonth = (date) => {
        if (date) {
            setChosenMonth(date.month() + 1)
        }
    };

    const onClickExportButton = async () => {
        try {
            await exportStudentFeeToExcel(chosenMonth);
            message.success("Xuất file học phí thành công");
        } catch (error) {
            message.error("Xuất file học phí thất bại");
            console.error("Export error:", error);
        }
    }

    dayjs.locale('vi');

    return (
        <ConfigProvider locale={viVN}>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "1%" }}>
                <div style={{ display: "flex" }}>
                    <h3 style={{ margin: "4px 10px 0px 0px" }}>Học phí tháng</h3>
                    <DatePicker
                        onChange={onChangeMonth}
                        picker="month"
                        format={"MM-YYYY"}
                        defaultValue={dayjs()}
                    />
                </div>

                <div>
                    <Button icon={<DownloadOutlined />} onClick={onClickExportButton}>
                        Xuất excel
                    </Button>
                </div>
            </div>

            <StudentFeeTable
                dataStudentFee={dataStudentFee}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}
            />
        </ConfigProvider>
    )
}

export default StudentFeePage;