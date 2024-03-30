import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [userCookies, setUserCookies] = useCookies(["user_token"]);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUserCookies("user_token", "");
    navigate("/login", { replace: true });
  };

  return (
    <div
      className={
        "bg-[#208FF5] flex justify-between text-xl font-Roboto text-white py-2 px-4 font-bold"
      }
    >
      <Link className="text-2xl" to="/">
        BabiChat
      </Link>

      <div className="flex">
        {userCookies.user_token ? (
          <button onClick={handleLogout} className="mx-4">
            Logout
          </button>
        ) : (
          <Link to="/login" className="mx-4">
            Login
          </Link>
        )}
        {userCookies.user_token && <Link to="/msg">Messenger</Link>}
      </div>
    </div>
  );
};

export default Navbar;
