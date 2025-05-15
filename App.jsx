import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Layout, message } from "antd";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/dashboard";
import "./App.css";

const { Header, Content, Footer } = Layout;

const PrivateRoute = ({ children }) => {
  const isAuth = localStorage.getItem('isLoggedIn') === 'true';
  return isAuth ? children : <Navigate to="/" replace />;
};

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("login");
  const navigate = useNavigate();

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/dashboard');
  };

  
  if (!user) {
    return (
      <Layout>
        <Content style={{ padding: "0 50px", marginTop: 64 }}>
          {page === "login" ? (
            <Login 
              onLogin={handleLogin}
              onGoRegister={() => setPage("register")}
            />
          ) : (
            <Register 
              onRegister={() => {
                message.success("Kayıt başarılı, şimdi giriş yapabilirsiniz.");
                setPage("login");
              }}
            />
          )}
        </Content>
      </Layout>
    );
  }


  return (
    <Layout>
      <Header style={{ color: "white", background: "#ff69b4" }}>
        <h1 style={{ color: "white" }}>Bütçe Yönetimi</h1>
      </Header>
      <Content style={{ padding: "0 50px", marginTop: 64 }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          } />
        </Routes>
      </Content>
      <Footer style={{ textAlign: "center" }}>
        Bütçe Yönetici
      </Footer>
    </Layout>
  );
}

export default AppWrapper;