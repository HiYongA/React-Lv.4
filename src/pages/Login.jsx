import React from "react";
import { css, styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useInput from "../api/useInput";

const Login = () => {
  const navigate = useNavigate();
  const [email, handleEmailChange] = useInput();
  const [password, handlePasswordChange] = useInput();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("이메일 또는 패스워드가 입력되지 않았습니다. 확인해주세요.");
    }

    try {
      // (1) 스파르타 서버에 저장
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/login`,
        {
          id: email,
          password,
        }
      );
      // 로그인 성공 시, 서버로부터 받은 토큰을 로컬 스토리지에 저장
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("activeUserEmail", email);
      navigate("/");
    } catch (error) {
      console.log("error with signUp", error);
    }
  };

  const handleJoinButtonClick = () => {
    navigate("/join");
  };

  return (
    <StyledLoginContainer>
      <StyledLoginBox>
        <StyledForm onSubmit={handleFormSubmit}>
          <StyledInput
            type="email"
            placeholder="이메일을 입력해주세요."
            value={email}
            onChange={handleEmailChange}
          />
          <StyledInput
            type="password"
            placeholder="비밀번호를 입력해주세요."
            value={password}
            onChange={handlePasswordChange}
          />
          <StyledButton type="submit" variant="primary">
            로그인
          </StyledButton>
        </StyledForm>
        <StyledSpacer />
        <StyledButton variant="secondary" onClick={handleJoinButtonClick}>
          회원가입
        </StyledButton>
      </StyledLoginBox>
    </StyledLoginContainer>
  );
};

export default Login;

const StyledLoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledLoginBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f7f7f7;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StyledInput = styled.input`
  padding: 12px;
  border: 1px solid #cccccc;
  border-radius: 4px;
`;

const StyledButton = styled.button`
  padding: 12px;
  /* background-color: #007bff; */
  color: #ffffff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  ${(props) =>
    props.variant === "primary" &&
    css`
      background-color: #007bff;

      &:hover {
        background-color: #0056b3;
      }
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: #6c757d;

      &:hover {
        background-color: #495057;
      }
    `}

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledSpacer = styled.div`
  height: 5px;
`;
