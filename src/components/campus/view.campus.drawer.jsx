import { Button, Drawer } from 'antd';


const ViewCampusDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, campusDetail } = props

    return (
        <>
            <Drawer
                width={"30vw"}
                title="Thông tin chi tiết"
                onClose={() => { setIsDetailOpen(false) }}
                open={isDetailOpen}
            >
                {campusDetail ?
                    <>
                        <div style={{ gap: "10px" }}>
                            <h4>ID </h4> {campusDetail.id}
                        </div>
                        <br />
                        <div style={{ gap: "10px" }}>
                            <h4>Cơ sở </h4> {campusDetail.name}
                        </div>
                        <br />
                        <div style={{ gap: "10px" }}>
                            <h4 style={{ width: "50px" }}>Địa chỉ </h4> {campusDetail.address}
                        </div>
                        <br />
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

export default ViewCampusDetail;