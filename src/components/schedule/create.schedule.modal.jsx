import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Form, Input, Modal, notification, Popconfirm, Select } from 'antd';
import { useEffect, useState } from 'react';
import { createScheduleAPI, deleteScheduleAPI, updateScheduleAPI } from '../../services/api.service';
import '../../styles/createScheduleModal.css';

const ScheduleForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false)

    const { fetchScheduleData, classData, isFormOpen, setIsFormOpen, weekdayList } = props

    const [formCreate] = Form.useForm();
    const [formUpdate] = Form.useForm();

    useEffect(() => {
        if (classData) {
            formCreate.setFieldValue("classInfo", classData?.name || "");
            formUpdate.setFieldValue("classInfo", classData?.name || "");
            formUpdate.setFieldValue("weekdays", classData?.schedule?.weekdayList || []);
        }
    }, [classData])

    const weekdayOptions = [
        { label: "Thứ 2", value: 1 },
        { label: "Thứ 3", value: 2 },
        { label: "Thứ 4", value: 3 },
        { label: "Thứ 5", value: 4 },
        { label: "Thứ 6", value: 5 },
        { label: "Thứ 7", value: 6 },
        { label: "Chủ nhật", value: 0 }
    ]

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinishCreate = async (values) => {
        const res = await createScheduleAPI({ id: classData?.id }, values.weekdays);
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Thêm mới lịch học thành công');
            await fetchScheduleData();
            setIsFormOpen(false);
            formCreate.resetFields();
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message));
        }
    };

    const onFinishUpdate = async (values) => {
        const res = await updateScheduleAPI(classData?.schedule?.id, { id: classData?.id }, values.weekdays);
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Cập nhật lịch học thành công');
            await fetchScheduleData();
            setIsUpdateFormOpen(false);
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message));
        }
    };

    const handleDeleteSchedule = async () => {
        const res = await deleteScheduleAPI(classData?.schedule?.id)
        if (res.data) {
            openNotificationWithIcon('success', 'Thành công', 'Xoá lịch học thành công');
            await fetchScheduleData();
        } else {
            openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message));
        }
    }

    return (
        <>
            {contextHolder}

            <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%" }}>
                <h3>
                    Lịch học
                </h3>

                {weekdayList && (
                    <div >
                        <Button style={{ margin: "0px 10px" }}
                            type='default'
                            color='yellow'
                            icon={<EditOutlined />}
                            onClick={() => setIsUpdateFormOpen(true)}
                        >
                            Cập nhật
                        </Button>

                        <Popconfirm
                            title="Xoá lịch học"
                            description="Bạn chắc chắn xoá lịch học này?"
                            onConfirm={() => handleDeleteSchedule()}
                            okText="Có"
                            cancelText="Không"
                            placement='left'
                        >
                            <Button style={{ margin: "0px 0px 0px 10px" }}
                                icon={<DeleteOutlined />}
                                danger
                            >
                                Xoá
                            </Button>
                        </Popconfirm>
                    </div>
                )}
            </div>

            <Modal
                title="Thêm lịch học mới" open={isFormOpen}
                onOk={() => formCreate.submit()}
                onCancel={() => {
                    setIsFormOpen(false);
                    formCreate.resetFields()
                }
                }
                okText="Thêm mới"
                cancelText="Huỷ"
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                        <CancelBtn />
                    </>
                )}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
                maskClosable={false}
            >
                <Form
                    form={formCreate}
                    onFinish={onFinishCreate}
                    layout='vertical'
                >
                    <Form.Item
                        label="Lớp học"
                        name="classInfo"
                        rules={[{ required: true, message: 'Vui lòng chọn lớp học !' }]}
                    >
                        <Input disabled />
                    </Form.Item>


                    <Form.Item
                        label="Lịch học"
                        name="weekdays"
                        rules={[{ required: true, message: "Vui lòng chọn ngày trong tuần !" }]}
                    >
                        <Select
                            mode='multiple'
                            placeholder="Chọn ngày trong tuần"
                            allowClear={true}
                            options={weekdayOptions}
                        />
                    </Form.Item>

                </Form>
            </Modal>

            <Modal
                title="Cập nhật lịch học"
                open={isUpdateFormOpen}
                onOk={() => formUpdate.submit()}
                onCancel={() => {
                    setIsUpdateFormOpen(false);
                }}
                okText="Cập nhật"
                cancelText="Huỷ"
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        <OkBtn />
                        <CancelBtn />
                    </>
                )}
                width={{
                    xs: '90%',
                    sm: '80%',
                    md: '70%',
                    lg: '60%',
                    xl: '50%',
                    xxl: '40%',
                }}
                maskClosable={false}
            >
                <Form
                    form={formUpdate}
                    onFinish={onFinishUpdate}
                    layout='vertical'
                >
                    <Form.Item
                        label="Lớp học"
                        name="classInfo"
                        rules={[{ required: true, message: 'Vui lòng chọn lớp học !' }]}
                    >
                        <Input disabled />
                    </Form.Item>


                    <Form.Item
                        label="Lịch học"
                        name="weekdays"
                        rules={[{ required: true, message: "Vui lòng chọn ngày trong tuần !" }]}
                    >
                        <Select
                            mode='multiple'
                            placeholder="Chọn ngày trong tuần"
                            allowClear={true}
                            options={weekdayOptions}
                        />
                    </Form.Item>

                </Form>
            </Modal>
        </>
    )

}

export default ScheduleForm;