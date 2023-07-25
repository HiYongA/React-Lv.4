import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Main from "../pages/Main";
import Write from "../pages/Write";
import Detail from "../pages/Detail";
import Join from "../pages/Join";
import Login from "../pages/Login";
import NonAuthLayout from "./NonAuthLayout";
import AuthLayout from "./AuthLayout";

// 토큰 정보가 반드시 필요한 화면 : main, detail, write
// 토큰 정보가 없어도 되는 화면 : 회원가입, 로그인
const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route element={<NonAuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/join" element={<Join />} />
          </Route>
          <Route
            element={
              <>
                <Header />
                <AuthLayout />
                <Footer />
              </>
            }
          >
            <Route path="/" element={<Main />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/write" element={<Write />} />
          </Route>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
