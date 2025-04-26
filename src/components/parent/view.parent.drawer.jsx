import { Button, Drawer } from 'antd';


const ViewParentDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, parentDetail } = props

    return (
        <>
            <Drawer
                width={"30vw"}
                title="Thông tin chi tiết"
                onClose={() => { setIsDetailOpen(false) }}
                open={isDetailOpen}
            >
                {parentDetail ?
                    <>
                        <div style={{ gap: "10px" }}>
                            <h4>ID </h4> {parentDetail.id}
                        </div>
                        <br />
                        <div style={{ gap: "10px" }}>
                            <h4>Cơ sở </h4> {parentDetail.name}
                        </div>
                        <br />
                        <div style={{ gap: "10px" }}>
                            <h4 style={{ width: "50px" }}>Địa chỉ </h4> {parentDetail.address}
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

export default ViewParentDetail;