import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Modal, notification, Select } from 'antd';
import { useState } from 'react';
import { createScheduleAPI } from '../../services/api.service';
import '../../styles/createScheduleModal.css';

const ScheduleForm = (props) => {

    const [api, contextHolder] = notification.useNotification({ maxCount: 1 });

    const [isFormOpen, setIsFormOpen] = useState(false)

    const { classOptions, fetchScheduleData } = props

    const [form] = Form.useForm();

    const slotOptions = [
        { label: "Slot 1", value: 1 },
        { label: "Slot 2", value: 2 },
        { label: "Slot 3", value: 3 }
    ]

    const weekdayOptions = [
        { label: "Thứ 2", value: 2 },
        { label: "Thứ 3", value: 3 },
        { label: "Thứ 4", value: 4 },
        { label: "Thứ 5", value: 5 },
        { label: "Thứ 6", value: 6 },
        { label: "Thứ 7", value: 7 },
        { label: "Chủ nhật", value: 1 }
    ]


    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 4 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 20 },
        },
    };
    const formItemLayoutWithOutLabel = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 20, offset: 4 },
        },
    };

    const openNotificationWithIcon = (type, message, description) => {
        api[type]({
            message: message,
            description: description
        });
    };

    const onFinish = async (values) => {
        console.log('Received values of form:', values);

        const classInfo = { id: values.classInfo };

        const allSlotNumbers = [values.slotNumber, ...(values.listSchedule?.map(item => item.slotNumber) || [])];
        const hasDuplicate = allSlotNumbers.some((slot, index) => allSlotNumbers.indexOf(slot) !== index);

        if (hasDuplicate) {
            openNotificationWithIcon('error', 'Thất bại', 'Có ca học bị trùng lặp. Vui lòng kiểm tra lại!');
            return;
        }

        try {
            let res = await createScheduleAPI(classInfo, values.slotNumber, values.weekday);
            if (!res.data) {
                openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message));
                return;
            }

            if (values.listSchedule) {
                for (const item of values.listSchedule) {
                    res = await createScheduleAPI(classInfo, item.slotNumber, item.weekday);
                    if (!res.data) {
                        openNotificationWithIcon('error', 'Thất bại', JSON.stringify(res.message));
                        return;
                    }
                }
            }

            openNotificationWithIcon('success', 'Thành công', 'Thêm mới lịch học thành công');
            await fetchScheduleData();
            setIsFormOpen(false);
            form.resetFields();
        } catch (error) {
            openNotificationWithIcon('error', 'Thất bại', 'Đã xảy ra lỗi trong quá trình xử lý!');
            console.error(error);
        }
    };

    return (
        <>
            {contextHolder}

            <div xs={24} style={{ display: "flex", justifyContent: "space-between", margin: "1%" }}>
                <h3>
                    Lịch học
                </h3>

                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsFormOpen(true)}
                >
                    Thêm mới
                </Button>
            </div>

            <Modal
                title="Thêm lịch học mới" open={isFormOpen}
                onOk={() => form.submit()}
                onCancel={() => {
                    setIsFormOpen(false);
                    form.resetFields()
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
                    form={form}
                    onFinish={onFinish}
                    layout='vertical'
                >
                    <Form.Item
                        label="Lớp học"
                        name="classInfo"
                        rules={[{ required: true, message: 'Vui lòng chọn lớp học !' }]}
                        style={{ width: "93%" }}
                    >
                        <Select
                            placeholder="Chọn lớp học"
                            allowClear={true}
                            options={classOptions}
                        >
                        </Select>
                    </Form.Item>

                    <Form.Item label="Lịch học" style={{ marginBottom: "5px" }}>
                        <Form.Item
                            name="slotNumber"
                            rules={[{ required: true, message: "Vui lòng chọn ca học !" }]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(44% - 8px)'
                            }}
                        >
                            <Select
                                placeholder="Chọn ca học"
                                allowClear={true}
                                options={slotOptions}
                            />
                        </Form.Item>
                        <Form.Item
                            name="weekday"
                            rules={[{ required: true, message: "Vui lòng chọn ngày trong tuần !" }]}
                            style={{
                                display: 'inline-block',
                                width: 'calc(50% - 8px)',
                                margin: '0 8px',
                            }}
                        >
                            <Select
                                mode='multiple'
                                placeholder="Chọn ngày trong tuần"
                                allowClear={true}
                                options={weekdayOptions}
                            />
                        </Form.Item>
                    </Form.Item>

                    <Form.List name="listSchedule">
                        {(fields, { add, remove }, { errors }) => (
                            <>
                                {fields.map((field, index) => (
                                    <Form.Item
                                        required={false}
                                        key={field.key}
                                        style={{ marginBottom: "5px" }}
                                    >
                                        <Form.Item
                                            {...field}
                                            name={[field.name, "slotNumber"]} // Liên kết với từng phần tử
                                            rules={[{ required: true, message: "Vui lòng chọn ca học!" }]}
                                            style={{ display: 'inline-block', width: 'calc(44% - 8px)' }}
                                        >
                                            <Select
                                                placeholder="Chọn ca học"
                                                allowClear={true}
                                                options={slotOptions}
                                            />
                                        </Form.Item>
                                        <Form.Item
                                            {...field}
                                            name={[field.name, "weekday"]} // Liên kết với từng phần tử
                                            rules={[{ required: true, message: "Vui lòng chọn ngày trong tuần!" }]}
                                            style={{
                                                display: 'inline-block',
                                                width: 'calc(50% - 8px)',
                                                margin: '0 8px',
                                            }}
                                        >
                                            <Select
                                                mode='multiple'
                                                placeholder="Chọn ngày trong tuần"
                                                allowClear={true}
                                                options={weekdayOptions}
                                            />
                                        </Form.Item>

                                        {fields.length > 0 ? (
                                            <MinusCircleOutlined
                                                className="dynamic-delete-button"
                                                onClick={() => remove(field.name)}
                                            />
                                        ) : null}
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button
                                        type="dashed"
                                        onClick={() => add()}
                                        style={{ width: '20%', margin: "20px 0px 10px 0px" }}
                                        icon={<PlusOutlined />}
                                    >
                                        Thêm ca học
                                    </Button>
                                    <Form.ErrorList errors={errors} />
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form>
            </Modal>
        </>
    )

}

export default ScheduleForm;