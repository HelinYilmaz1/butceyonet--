import React, { useState, useEffect } from "react";
import { Card, Row, Col, Space, Spin, message } from "antd";
import BalanceChart from "./BalanceChart";
import BudgetList from "./BudgetList";
import CalendarView from "./CalendarView";
import AddTransaction from "./AddTransaction";
import LogoutButton from "./LogoutButton";
import ReportButton from "./ReportButton";
import axios from "axios";
import dayjs from "dayjs";

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const SHEET_API = "https://v1.nocodeapi.com/helin_/google_sheets/YjMSpKjHwSUJcrsn?tabId=islemler&range=A1:E";

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(SHEET_API);
      const rawData = response.data.data;
  
      const formattedData = rawData.map((item, index) => ({
        id: index,
        date: item.date,
        type: item.type,
        category: item.category || "Diğer",
        description: item.description || "",
        amount: parseFloat(item.amount) || 0,
      }));
  
      setTransactions(formattedData);
    } catch (err) {
      console.error("Veri alınamadı", err);
      message.error("Veriler yüklenirken hata oluştu");
    } finally {
      setLoading(false);
    }
  };
  

  const handleAddTransaction = async (newTransaction) => {
    try {
      const amount = newTransaction.type === "Gider" 
        ? -Math.abs(newTransaction.amount) 
        : Math.abs(newTransaction.amount);
      
      const transactionData = [
        dayjs(newTransaction.date).format("YYYY-MM-DD"),
        newTransaction.type,
        newTransaction.category,
        newTransaction.description,
        amount
      ];

      await axios.post(SHEET_API, [transactionData]);
      message.success("İşlem başarıyla eklendi!");
      fetchTransactions();
    } catch (error) {
      console.error("Hata:", error);
      message.error("İşlem eklenemedi");
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);
  
  useEffect(() => {
    console.log("GÜNCELLENEN VERİ:", transactions);
  }, [transactions]);
  

  const handleDeleteTransaction = async (id) => {
    try {
      message.success("İşlem silindi");
      fetchTransactions();
    } catch (error) {
      console.error("Silme hatası:", error);
      message.error("Silme işlemi başarısız");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    window.location.href = "/";
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div style={{ padding: "24px" }}>
      {/* Rapor için gizli içerik */}
      <div id="report-content" style={{ display: "none" }}>
        <h2>Bütçe Raporu - {dayjs().format("DD.MM.YYYY")}</h2>
        <BalanceChart transactions={transactions} />
        <BudgetList data={transactions} />
      </div>

     
      <Space style={{ 
        width: "100%", 
        justifyContent: "space-between", 
        marginBottom: 24 
      }}>
        <h2>Bütçe Yönetim Paneli</h2>
        <Space>
          <ReportButton />
          <LogoutButton onLogout={handleLogout} />
        </Space>
      </Space>

      <Row gutter={[24, 24]}>
        
        <Col xs={24} md={12}>
          <Card 
            title="Yeni İşlem Ekle" 
            style={{ marginBottom: 24 }}
            loading={loading}
          >
            <AddTransaction 
              onSubmit={handleAddTransaction} 
              categories={[...new Set(transactions.map(t => t.category))]}
            />
          </Card>
        </Col>

        
        <Col xs={24} md={12}>
          <Card 
            title="Bakiye Özeti" 
            style={{ marginBottom: 24 }}
            loading={loading}
          >
            <BalanceChart transactions={transactions} />
          </Card>
        </Col>

        
        <Col span={24}>
          <Card 
            title="İşlem Geçmişi"
            loading={loading}
          >
            <BudgetList 
              data={transactions} 
              onDelete={handleDeleteTransaction}
              onRefresh={fetchTransactions}
            />
          </Card>
        </Col>

        
        <Col span={24}>
          <Card 
            title="Takvim Görünümü"
            loading={loading}
          >
            <CalendarView 
              transactions={transactions} 
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;


