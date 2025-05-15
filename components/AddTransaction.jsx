import React, { useState } from "react";
import { Form, Input, InputNumber, Button, DatePicker, Select, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

const { Option } = Select;

const AddTransaction = ({ onAddSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    const formattedDate = dayjs(values.date).format("YYYY-MM-DD");

    const newRow = [
      formattedDate,
      values.type,
      values.category,
      values.description || "",
      values.amount,
    ];

    try {
      setLoading(true);
     
      await axios.post(
        "https://v1.nocodeapi.com/helin_/google_sheets/YjMSpKjHwSUJcrsn?tabId=islemler&range=A1:E",
        [newRow],
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      

      message.success("İşlem başarıyla eklendi!");
      form.resetFields();
      if (onAddSuccess) onAddSuccess(); 
    } catch (error) {
      console.error(error);
      message.error("İşlem eklenemedi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item name="date" label="Tarih" rules={[{ required: true }]}>
        <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
      </Form.Item>

      <Form.Item name="type" label="Tür" rules={[{ required: true }]}>
        <Select placeholder="Gelir veya Gider seçin">
          <Option value="Gelir">Gelir</Option>
          <Option value="Gider">Gider</Option>
        </Select>
      </Form.Item>

      <Form.Item name="category" label="Kategori" rules={[{ required: true }]}>
        <Input placeholder="Kategori" />
      </Form.Item>

      <Form.Item name="description" label="Açıklama">
        <Input placeholder="İsteğe bağlı açıklama" />
      </Form.Item>

      <Form.Item name="amount" label="Tutar (₺)" rules={[{ required: true }]}>
        <InputNumber style={{ width: "100%" }} min={0} />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Kaydet
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddTransaction;