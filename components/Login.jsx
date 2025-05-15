import { useState } from "react";
import { Form, Input, Button, Card, message } from "antd";

const Login = ({ onLogin, onGoRegister }) => {
  const [loading, setLoading] = useState(false);

  const onFinish = (values) => {
    setLoading(true);

    setTimeout(() => {
      if (values.username === "admin" && values.password === "1234") {
        onLogin({ username: "admin" });
        message.success("Login successful");
      } else {
        message.error("Invalid credentials");
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: "2rem auto" }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please enter username" }]}
        >
          <Input />
        </Form.Item>


        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please enter password" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} block>
            Login
          </Button>
        </Form.Item>

        <Button type="link" onClick={onGoRegister}>
        Kayıt Ol
        </Button>

      </Form>
    </Card>
  );
};

export default Login;
