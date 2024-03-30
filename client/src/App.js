import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Messenger from "./pages/Messenger";
import Login from "./pages/Login";
import Conversation from "./pages/Conversation";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/msg" element={<Messenger />} />
        <Route path="/login" element={<Login />} />
        <Route path="/c" element={<Conversation />} />
      </Routes>
    </>
  );
}

export default App;
