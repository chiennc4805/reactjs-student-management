import { Badge, Descriptions, Drawer, Tag } from 'antd';


const ViewTeacherDetail = (props) => {

    const { isDetailOpen, setIsDetailOpen, teacherDetail } = props

    const items = [
        {
            key: '1',
            label: 'Họ và tên',
            children: <span>{teacherDetail?.name}</span>,
        },
        {
            key: '2',
            label: 'Số điện thoại',
            children: <span>{teacherDetail?.telephone}</span>,
        },
        {
            key: '3',
            label: 'Giới tính',
            children: <span>{teacherDetail?.gender ? "Nam" : "Nữ"}</span>,
        },
        {
            key: '4',
            label: 'Ngày sinh',
            children: <span>{teacherDetail?.birthDate}</span>,
        },
        {
            key: '5',
            label: 'Địa chỉ',
            span: 2,
            children: <span>{teacherDetail?.address}</span>,
        },
        {
            key: '6',
            label: 'Tên Zalo',
            children: <span>{teacherDetail?.zaloName}</span>,
        },
        {
            key: '7',
            label: 'Tên Facebook',
            children: <span>{teacherDetail?.facebookName}</span>,
        },
        {
            key: '8',
            label: 'Lớp học',
            span: 2,
            children:
                <>
                    {teacherDetail?.subjects.map(subject => {
                        return (
                            <Tag key={subject.id}>
                                {subject.name}
                            </Tag>
                        );
                    })}
                </>
        },
        {
            key: '9',
            label: "Trạng thái",
            children: <Badge status="success" text={teacherDetail?.status} />,
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
                {teacherDetail ?
                    <>
                        <Descriptions
                            title="User Info"
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

export default ViewTeacherDetail;