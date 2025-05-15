import React from "react";
import { Card } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";

const BalanceChart = ({ transactions = [] }) => {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];
  
  
  const income = safeTransactions
    .filter(t => t?.type === "Gelir")
    .reduce((sum, t) => sum + (parseFloat(t?.amount) || 0), 0);

  const expense = safeTransactions
    .filter(t => t?.type === "Gider")
    .reduce((sum, t) => sum + Math.abs(parseFloat(t?.amount) || 0), 0);

  const balance = income - expense;

  const chartData = [
    { name: "Gelir", value: income },
    { name: "Gider", value: expense },
    { name: "Bakiye", value: balance }
  ];

  return (
    <Card title="Bakiye Özeti" style={{ marginBottom: 24 }}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            formatter={(value) => [`${value} ₺`, 
              value === balance ? "Bakiye" : 
              value === income ? "Toplam Gelir" : "Toplam Gider"]}
          />
          <Legend />
          <Bar 
            dataKey="value" 
            fill="#8884d8" 
            name="Tutar"
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BalanceChart;