import { Button, Drawer } from 'antd';


const ViewTeacherDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, teacherDetail } = props

    return (
        <>
            <Drawer
                width={"30vw"}
                title="Thông tin chi tiết"
                onClose={() => { setIsDetailOpen(false) }}
                open={isDetailOpen}
            >
                {teacherDetail ?
                    <>
                        <p style={{ display: "flex", gap: "10px" }}>
                            <h4>ID: </h4> {teacherDetail.id}
                        </p>
                        <br />
                        <p style={{ display: "flex", gap: "10px" }}>
                            <h4>Họ và tên: </h4> {teacherDetail.name}
                        </p>
                        <br />
                        <p style={{ display: "flex", gap: "10px" }}>
                            <h4>Giới tính:</h4> {teacherDetail.gender ? "Nam" : "Nữ"}
                        </p>
                        <br />
                        <p style={{ display: "flex", gap: "10px" }}>
                            <h4>Ngày sinh: </h4> {teacherDetail.birthDate}
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

export default ViewTeacherDetail;