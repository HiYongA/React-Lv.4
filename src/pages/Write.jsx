import React, { useState } from "react";
import styled from "styled-components";
import { StyledSubmitButton } from "../components/Button";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { addDiary } from "../api/diaries";
import { type } from "@testing-library/user-event/dist/type";

const Write = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const addmutation = useMutation(addDiary, {
    onSuccess: () => {
      queryClient.invalidateQueries("diary");
    },
  });

  const [mood, setMood] = useState(1);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [password, setPassword] = useState("");

  const handleWriteButtonClick = (e) => {
    e.preventDefault();

    if (!title || !content || !password) {
      alert("필수 입력값이 없습니다. 확인해주세요!");
      return false;
    }

    if ([1, 2, 3, 4, 5].some((item) => item === mood)) {
      alert("오늘 기분은 1~5 중에 하나가 선택돼야 합니다. 확인해주세요.");

      return false;
    }

    // new Date().toLocaleDateString(): Date객체를 원하는 형식의 문자열로 변환해주는 함수
    // new Date().toLocaleDateString([locales[, options]])
    // locales: 선택적 매개변수로, 원하는 언어 또는 지역 설정을 지정
    // options: 선택적 매개변수로, 날짜를 원하는 형식으로 변환하기 위해 객체로 설정 가능
    const formattedDate = new Date().toLocaleDateString("en-US", {
      month: "long", // 월의 긴 형태 July
      day: "numeric", // 숫자 형태 7
      year: "numeric", // 숫자 형태 2023
    });
    addmutation.mutate({
      moodCode: mood,
      title,
      body: content,
      password,
      isDeleted: false,
      createdAt: formattedDate,
    });

    navigate("/");
    setMood(1);
    setTitle("");
    setContent("");
    setPassword("");
  };

  const handleMoodChange = (e) => {
    setMood(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // useEffect(() => {
  //   console.log("mood", mood);
  // }, [mood]);

  return (
    <StyledMain>
      <StyledTitle>Write Diary</StyledTitle>
      <StyledDate>July 7, 2023</StyledDate>
      <form onSubmit={handleWriteButtonClick}>
        <StyledMoodLabel htmlFor="moodSelect">Mood:</StyledMoodLabel>
        <StyledMoodSelect id="moodSelect" onChange={handleMoodChange}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </StyledMoodSelect>

        <StyledTitleLabel htmlFor="titleTextInput">Title:</StyledTitleLabel>
        <StyledTitleInput
          id="titleTextInput"
          value={title}
          onChange={handleTitleChange}
        />
        <StyledContentLabel htmlFor="contentTextarea">
          Content:
        </StyledContentLabel>
        <StyledContentTextarea
          id="contentTextarea"
          value={content}
          onChange={handleContentChange}
        />

        <StyledPasswordLabel htmlFor="passwordInput">
          Password:
        </StyledPasswordLabel>
        <StyledPasswordInput
          type="password"
          id="passwordInput"
          value={password}
          onChange={handlePasswordChange}
        />
        <StyledSubmitButton>제출</StyledSubmitButton>
      </form>
    </StyledMain>
  );
};

export default Write;

const StyledMain = styled.main`
  flex: 1;
  padding: 20px;
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  font-size: 24px;
  color: #293241;
`;

const StyledDate = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;

const StyledMoodLabel = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #293241;
`;

const StyledMoodSelect = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const StyledTitleLabel = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #293241;
`;

const StyledTitleInput = styled.input`
  width: 100%;
  height: 20px;
  padding: 10px;
  font-size: 16px;
`;

const StyledContentLabel = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #293241;
`;

const StyledContentTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 16px;
`;

const StyledPasswordLabel = styled.label`
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #293241;
`;

const StyledPasswordInput = styled.input`
  padding: 10px;
  font-size: 16px;
  margin-right: 10px;
`;
