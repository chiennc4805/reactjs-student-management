import { Descriptions, Drawer, Tag } from 'antd';


const ViewStudentDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, studentDetail } = props

    const items = [
        {
            key: '1',
            label: 'Họ và tên',
            children: <span>{studentDetail?.name}</span>,
        },
        {
            key: '2',
            label: 'Số điện thoại PH',
            children: <span>{studentDetail?.parent.telephone}</span>,
        },
        {
            key: '3',
            label: 'Giới tính',
            children: <span>{studentDetail?.gender ? "Nam" : "Nữ"}</span>,
        },
        {
            key: '4',
            label: 'Ngày sinh',
            children: <span>{studentDetail?.birthDate}</span>,
        },
        {
            key: '6',
            label: 'Chiều cao (cm)',
            children: <span>{studentDetail?.height}</span>,
        },
        {
            key: '7',
            label: 'Cân nặng (kg)',
            children: <span>{studentDetail?.weight}</span>,
        },
        {
            key: '8',
            label: 'Lớp học',
            span: 2,
            children:
                <>
                    {studentDetail?.classes.map(c => {
                        return (
                            <Tag key={c.id}>
                                {c.name}
                            </Tag>
                        );
                    })}
                </>
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
                {studentDetail ?
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

export default ViewStudentDetail;