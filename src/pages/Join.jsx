import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import useInput from "../api/useInput";

const Join = () => {
  const navigate = useNavigate();
  const [nickname, handleNicknameChange] = useInput("");
  const [email, handleEmailChange] = useInput();
  const [password, handlePasswordChange] = useInput();
  const [confirmPassword, handleConfirmPasswordChange] = useInput();

  const handleLoginLinkClick = () => {
    navigate("/login");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("비밀번호가 다릅니다. 확인해주세요!");
      return false;
    }

    try {
      // (1) 스파르타 서버에 저장
      await axios.post(`${process.env.REACT_APP_SERVER_URL}/register`, {
        id: email,
        password,
      });
      // (2) JSON-SERVER에 저장
      await axios.post(`${process.env.REACT_APP_JSON_URL}/nickname`, {
        id: email,
        nickname,
      });

      alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다");
      navigate("/login");
    } catch (error) {
      console.log("error with signUp", error);
    }
  };

  return (
    <StyledSignUpContainer>
      <StyledSignUpBox>
        <StyledForm onSubmit={handleFormSubmit}>
          <StyledInput
            type="text"
            placeholder="닉네임을 입력해주세요."
            value={nickname}
            onChange={handleNicknameChange}
          />
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
          <StyledInput
            type="password"
            placeholder="비밀번호를 확인해주세요."
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
          <StyledButton type="submit">가입하기</StyledButton>
        </StyledForm>
        <StyledLoginLink onClick={handleLoginLinkClick}>로그인</StyledLoginLink>
      </StyledSignUpBox>
    </StyledSignUpContainer>
  );
};

export default Join;

const StyledSignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const StyledSignUpBox = styled.div`
  background-color: #f7f7f7;
  padding: 40px;
  border-radius: 8px;
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
  background-color: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

const StyledLoginLink = styled.a`
  cursor: pointer;
  color: #007bff;
  text-decoration: none;
  text-align: center;
  font-size: 14px;
`;
