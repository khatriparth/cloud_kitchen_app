import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      navigate("/login");
    } else {
      fetch("http://127.0.0.1:8000/api/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUserName(data.name);
        })
        .catch(() => {
          localStorage.removeItem("access_token");
          navigate("/login");
        });
    }
  }, []);

  return (
    <div>
      <h2>Welcome, {userName}!</h2>
      <button onClick={() => navigate("/profile")}>Go to Profile</button>
      <br />
      <br />
      <button onClick={handleLogout}>Logout</button>
    </div>  );
};

export default Home;
