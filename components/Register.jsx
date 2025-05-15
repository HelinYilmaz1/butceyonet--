import { Button, Form, Input, message } from "antd";
import axios from "axios";

const Register = ({ onRegister }) => {
  const [form] = Form.useForm();

  const handleRegister = async (values) => {
    const newUser = {
      username: values.username,
      email: values.email,
      password: values.password,
    };

    try {
      await axios.post(
        "https://v1.nocodeapi.com/helin_/google_sheets/YjMSpKjHwSUJcrsn?tabId=Users&range=A1:C",
        [Object.values(newUser)]
      );

      message.success("Kayıt başarılı! Giriş yapabilirsiniz.");
      onRegister(newUser); 
    } catch (error) {
      console.error(error);
      message.error("Kayıt sırasında bir hata oluştu.");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", padding: 24 }}>
      <h2>Kayıt Ol</h2>
      <Form form={form} onFinish={handleRegister} layout="vertical">
        <Form.Item
          label="Kullanıcı Adı"
          name="username"
          rules={[{ required: true, message: "Kullanıcı adı gerekli" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Email gerekli" }]}
        >
          <Input type="email" />
        </Form.Item>
        <Form.Item
          label="Şifre"
          name="password"
          rules={[{ required: true, message: "Şifre gerekli" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Kayıt Ol
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Register;

