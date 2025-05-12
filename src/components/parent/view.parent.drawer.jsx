import { Descriptions, Drawer } from 'antd';


const ViewParentDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, parentDetail } = props

    const items = [
        {
            key: '1',
            label: 'Họ và tên',
            children: <span>{parentDetail?.name}</span>,
        },
        {
            key: '2',
            label: 'Số điện thoại',
            children: <span>{parentDetail?.telephone}</span>,
        },
        {
            key: '3',
            label: 'Giới tính',
            children: <span>{parentDetail?.gender ? "Nam" : "Nữ"}</span>,
        },
        {
            key: '4',
            label: 'Ngày sinh',
            children: <span>{parentDetail?.birthDate}</span>,
        },
        {
            key: '5',
            label: 'Địa chỉ',
            span: 2,
            children: <span>{parentDetail?.address}</span>,
        },
        {
            key: '6',
            label: 'Tên Zalo',
            children: <span>{parentDetail?.zaloName}</span>,
        },
        {
            key: '7',
            label: 'Tên Facebook',
            children: <span>{parentDetail?.facebookName}</span>,
        },
    ]

    return (
        <>
            <Drawer
                width={"40vw"}
                title="Thông tin chi tiết"
                onClose={() => { setIsDetailOpen(false) }}
                open={isDetailOpen}
            >
                {parentDetail ?
                    <>
                        <Descriptions
                            layout="vertical"
                            bordered
                            items={items}
                            column={2}
                        />
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