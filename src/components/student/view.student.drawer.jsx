import { Button, Drawer } from 'antd';


const ViewStudentDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, studentDetail } = props

    return (
        <>
            <Drawer
                width={"30vw"}
                title="Thông tin chi tiết"
                onClose={() => { setIsDetailOpen(false) }}
                open={isDetailOpen}
            >
                {studentDetail ?
                    <>
                        <p style={{ display: "flex", gap: "10px" }}>
                            <h4>ID: </h4> {studentDetail.id}
                        </p>
                        <br />
                        <p style={{ display: "flex", gap: "10px" }}>
                            <h4>Họ và tên: </h4> {studentDetail.id}
                        </p>
                        <br />
                        <p style={{ display: "flex", gap: "10px" }}>
                            <h4>Giới tính:</h4> {studentDetail.gender ? "Nam" : "Nữ"}
                        </p>
                        <br />
                        <p style={{ display: "flex", gap: "10px" }}>
                            <h4>Ngày sinh: </h4> {studentDetail.birthDate}
                        </p>
                    </>
                    :
                    <>
                        <p>Không có dữ liệu</p>
                    </>
                }

            </Drawer >
        </>
    )
}

export default ViewStudentDetail;