import { Button } from "antd";

const LogoutButton = ({ onLogout }) => {
  return (
    <Button 
      danger 
      type="primary" 
      onClick={onLogout}
      style={{ marginLeft: 16 }}
    >
      Çıkış Yap
    </Button>
  );
};

export default LogoutButton;