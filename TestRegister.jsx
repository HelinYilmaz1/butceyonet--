import React from "react";
import { Button, Form, Input, message } from "antd";
import "antd/dist/antd.css";

const TestRegister = () => {
  const [form] = Form.useForm();

  const handleRegister = (values) => {
    message.success("Kayıt başarılı!");
  };

  return (
    <div style={{ maxWidth: 400, margin: "20px auto", padding: 24, border: "1px solid #ddd" }}>
      <h2>Kayıt Ol</h2>
      <Form form={form} onFinish={handleRegister} layout="vertical">
        <Form.Item label="Email" name="email" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ backgroundColor: "#ff69b4" }}>
            Kayıt Ol
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default TestRegister;
