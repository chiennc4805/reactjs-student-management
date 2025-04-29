import { ArrowRightOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Form, Input, message, notification, Row } from "antd";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../components/context/auth.context";
import { loginAPI } from "../services/api.service";

const LoginPage = () => {

    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { setUser } = useContext(AuthContext)


    const onFinish = async (values) => {
        setLoading(true)
        const res = await loginAPI(values.username, values.password)
        if (res.data) {
            message.success("Đăng nhập thành công")
            localStorage.setItem("access_token", res.data.access_token)
            setUser(res.data.user)
            navigate("/")
        }
        else {
            notification.error({
                message: "Error login",
                description: JSON.stringify(res.message)
            })
        }
        setLoading(false)
    }

    return (
        <Row justify={"center"} style={{ marginTop: "30px" }}>
            <Col xs={24} md={16} lg={8}>
                <fieldset style={{
                    padding: "15px",
                    margin: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px"
                }}>
                    <legend>Đăng Nhập</legend>
                    <Form
                        form={form}
                        layout="vertical"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label="Tài khoản"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền tài khoản !'
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng điền mật khẩu !'
                                }
                            ]}
                        >
                            <Input.Password onKeyDown={(event) => {
                                if (event.key === "Enter") form.submit()
                            }} />
                        </Form.Item>

                        <Form.Item>
                            <div style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                <Button
                                    loading={loading}
                                    type="primary"
                                    onClick={() => form.submit()}>
                                    Login
                                </Button>
                                <Link to={"/"}> Go to homepage <ArrowRightOutlined /></Link>
                            </div>
                        </Form.Item>
                    </Form>
                    <Divider />
                    <div style={{ textAlign: "center" }}>
                        Chưa có tài khoản? Vui lòng liên hệ quản lý
                    </div>
                </fieldset>
            </Col>
        </Row >
    )
}

export default LoginPage;