import BigMap from "./components/bigMap/BigMap.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import UserCard from "./components/usercard/UserCard.jsx";
import Howworks from "./components/howWorks/HowWorks.jsx";
import Error404 from "./components/error404/Error404.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { Context } from "./context/Context.js";

function App() {
  const { user } = useContext(Context);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<BigMap />} />
        <Route path="/login" element={user ? <BigMap /> : <Login />} />
        <Route path="/register" element={!user ? <Register /> : <BigMap />} />
        <Route path="/users" element={<UserCard />} />
        <Route path="/about" element={<Howworks />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
