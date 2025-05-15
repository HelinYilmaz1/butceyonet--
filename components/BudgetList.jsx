import React, { useState, useEffect } from "react"; 
import { 
  Table, 
  Tag, 
  Input, 
  DatePicker, 
  Select, 
  Space, 
  Button, 
  Popconfirm 
} from "antd";
import dayjs from "dayjs";
import axios from "axios";

const { Search } = Input;
const { RangePicker } = DatePicker;

const BudgetList = ({ data, onDelete, onRefresh }) => {
  const [filteredData, setFilteredData] = useState([...data]);
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState("all");
  const [dateRange, setDateRange] = useState(null);

  useEffect(() => {
    filterData();
  }, [searchText, category, dateRange, data]);

  const filterData = () => {
    const lowerSearch = searchText.toLowerCase();

    const result = data.filter((item) => {
      const matchText =
        (item.description?.toLowerCase().includes(lowerSearch) ||
        item.category?.toLowerCase().includes(lowerSearch)) ?? false;

      const matchCategory =
        category === "all" || item.category === category;

      const matchDate =
        !dateRange ||
        (dayjs(item.date).isAfter(dateRange[0], "day") &&
         dayjs(item.date).isBefore(dateRange[1], "day"));

      return matchText && matchCategory && matchDate;
    });

    setFilteredData(result);
  };

  const getTitle = () => {
    const uniqueCategories = [...new Set(data.map((d) => d.category))];

    return (
      <Space direction="vertical" size="middle">
        <Space>
          <Search
            placeholder="Açıklama veya kategori ara"
            allowClear
            onSearch={setSearchText}
            style={{ width: 250 }}
          />
          <Select
            placeholder="Kategori"
            onChange={setCategory}
            defaultValue="all"
            style={{ width: 150 }}
          >
            <Select.Option value="all">Tümü</Select.Option>
            {uniqueCategories.map((cat) => (
              <Select.Option key={cat} value={cat}>
                {cat}
              </Select.Option>
            ))}
          </Select>
          <RangePicker 
            onChange={setDateRange} 
            placeholder={['Başlangıç', 'Bitiş']}
          />
        </Space>
        <Tag color="blue">Toplam Kayıt: {filteredData.length}</Tag>
      </Space>
    );
  };

  const columns = [
    {
      title: "Tarih",
      dataIndex: "date",
      render: (text) => dayjs(text).format("YYYY-MM-DD"),
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
    },
    { 
      title: "Açıklama", 
      dataIndex: "description",
      sorter: (a, b) => a.description?.localeCompare(b.description),
    },
    { 
      title: "Kategori", 
      dataIndex: "category",
      sorter: (a, b) => a.category?.localeCompare(b.category),
    },
    {
      title: "Tutar",
      dataIndex: "amount",
      render: (value) => (
        <Tag color={value >= 0 ? "green" : "red"}>
          {value >= 0 ? "+" : "-"}{Math.abs(value)}₺
        </Tag>
      ),
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Bu kaydı silmek istediğinize emin misiniz?"
            onConfirm={() => onDelete(record.id)}
            okText="Evet"
            cancelText="Hayır"
          >
            <Button danger size="small">Sil</Button>
          </Popconfirm>
          <Button size="small" onClick={onRefresh}>Yenile</Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      title={getTitle}
      columns={columns}
      dataSource={filteredData}
      rowKey="id"
      pagination={{ 
        pageSize: 10,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '50'],
        showTotal: (total) => `Toplam ${total} kayıt`
      }}
      scroll={{ x: true }}
      bordered
    />
  );
};

export default BudgetList;