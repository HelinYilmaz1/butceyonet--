import { Calendar, Badge, Card } from "antd";
import dayjs from "dayjs";

const CalendarView = ({ transactions = [], selectedDate, onDateChange }) => {
  const safeTransactions = Array.isArray(transactions) ? transactions : [];

  const getListData = (value) => {
    const dateStr = dayjs(value).format("YYYY-MM-DD");
    return safeTransactions
      .filter(t => t?.date === dateStr)
      .map(t => ({
        type: t?.amount >= 0 ? "success" : "error",
        content: `${t?.category || 'Kategorisiz'}: ${Math.abs(t?.amount || 0)}₺`,
      }));
  };

  
  const cellRender = (current, info) => {
    if (info.type === 'date') {
      const listData = getListData(current);
      return (
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {listData.map((item, index) => (
            <li key={index}>
              <Badge status={item.type} text={item.content} />
            </li>
          ))}
        </ul>
      );
    }
    return null;
  };

  return (
    <Card title="İşlem Takvimi" style={{ marginTop: 16 }}>
      <Calendar 
        value={selectedDate ? dayjs(selectedDate) : dayjs()}
        onSelect={onDateChange}
        cellRender={cellRender}
      />
    </Card>
  );
};

export default CalendarView;