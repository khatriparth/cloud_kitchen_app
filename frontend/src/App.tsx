import { Routes, Route, Navigate } from "react-router-dom";
import { Register, Login, Home, Profile } from "./pages";


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/register" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} /> 
      <Route path="/profile" element={<Profile />} />    </Routes>
  );
};

export default App;
