import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    const checkToken = async () => {
      try {
        await axios.get(`${process.env.REACT_APP_JSON_URL}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        alert("토큰 정보가 유효하지 않습니다. 로그인 화면으로 이동합니다.");
        localStorage.removeItem("token");
        localStorage.removeItem("activeUserEmail");
        navigate("/login");
      }
    };
    // if (!token) {
    //   alert("토큰이 없습니다. 로그인 화면으로 이동합니다.");
    //   navigate("/login");
    // } else {
    checkToken();
    // }
  }, [navigate]);
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
