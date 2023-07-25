import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getNickname } from "../api/nickname";

const Header = () => {
  const navigate = useNavigate();
  const [loginUser, setLoginUser] = useState(null);

  const activeUserEmail = localStorage.getItem("activeUserEmail");

  const { data } = useQuery("nickname", () => getNickname(activeUserEmail));

  // 로그인한 유저에 email를 불러오기 방법
  // const activeUserObj = data.find(item => item.id === activeUserEmail);

  useEffect(() => {
    // 로컬 스토리지에서 토큰을 가져와서 로그인 상태 확인
    const token = localStorage.getItem("token");

    // 옵셔널 체이닝을 사용하여 data 배열이 존재하고 최소한 하나의 요소가 있으며,
    // nickname 속성이 있는 경우에만 setLoginUser를 호출합니다.
    if (token && data?.[0]?.nickname) {
      setLoginUser({ nickname: data[0].nickname });
    } else {
      setLoginUser(null);
    }
  }, [data]);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleWriteButtonClick = () => {
    navigate("/write");
  };

  const handleLogoutButtonClick = async () => {
    const isConfirmed = window.confirm("로그아웃하시겠습니까?");
    if (isConfirmed) {
      localStorage.removeItem("token");
      localStorage.removeItem("activeUserEmail");
    }
    setLoginUser(null);
  };

  return (
    <StyledHeader>
      <StyledLogo
        src="https://spartacodingclub.kr/_next/image?url=%2Fv5%2Ficons%2Flogo-active.png&w=1080&q=100"
        alt="Logo"
        onClick={handleLogoClick}
      />
      <StyledButtonContainer>
        <StyledWriteButton onClick={handleWriteButtonClick}>
          일기쓰기
        </StyledWriteButton>
        {loginUser ? (
          <>
            <StyledNickname>{loginUser.nickname} 님</StyledNickname>
            <StyledWriteButton onClick={handleLogoutButtonClick}>
              로그아웃
            </StyledWriteButton>
          </>
        ) : (
          <>
            <StyledWriteButton onClick={() => navigate("login")}>
              로그인
            </StyledWriteButton>
            <StyledWriteButton
              onClick={() => {
                navigate("join");
              }}
            >
              회원가입
            </StyledWriteButton>
          </>
        )}
      </StyledButtonContainer>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #3d5a80;
`;

const StyledLogo = styled.img`
  cursor: pointer;
  width: 100px;
`;

const StyledWriteButton = styled.button`
  padding: 10px 20px;
  background-color: #98c1d9;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-family: inherit;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background-color: #81a4c2;
  }
`;

const StyledNickname = styled.div`
  color: #fff;
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
