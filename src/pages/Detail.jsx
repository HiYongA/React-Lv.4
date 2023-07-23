import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { StyledSubmitButton } from "../components/Button";
import { deleteDiary, getDiaries, updateDiary } from "../api/diaries";
import { useMutation, useQuery, useQueryClient } from "react-query";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data } = useQuery("diary", getDiaries);

  const diary = data.find((item) => item.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [editedMood, setEditedMood] = useState(diary.moodCode);
  const [editedBody, setEditedBody] = useState(diary.body);
  const [confPw, setConfPw] = useState(false);

  const queryClient = useQueryClient();

  const updatemutation = useMutation(updateDiary, {
    onSuccess: () => {
      queryClient.invalidateQueries("diary");
    },
  });

  const deletemutation = useMutation(deleteDiary, {
    onSuccess: () => {
      queryClient.invalidateQueries("diary");
    },
  });

  const handleSaveButtonClick = () => {
    // 서버에 업데이트할 내용 전송
    updatemutation.mutate({
      id: diary.id,
      moodCode: editedMood,
      body: editedBody,
    });

    setIsEditing(false);
  };

  const handleCancelButtonClick = () => {
    setIsEditing(false);
  };

  const handleEditButtonClick = () => {
    // 비밀번호 입력창 오픈
    setConfPw(true);
  };

  const handleConfPwSubmit = (pw) => {
    if (diary.password === pw) {
      // 비밀번호 일치 시 수정 상태로 전환
      setIsEditing(true);
      setConfPw(false);
    } else {
      alert("비밀번호가 올바르지 않습니다. 다시 입력해주세요.");
    }
  };

  const handleDeleteButtonClick = (id) => {
    deletemutation.mutate(id);
    navigate("/");
  };

  return (
    <StyledMain>
      <StyledTitle>{diary.title}</StyledTitle>
      <StyledDate>{diary.createdAt}</StyledDate>
      <StyledMood>
        <div>Mood:</div>
        {isEditing ? (
          <StyledMoodSelect
            id="moodSelect"
            onChange={(e) => setEditedMood(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </StyledMoodSelect>
        ) : (
          diary.moodCode
        )}
      </StyledMood>
      <StyledContent>
        {isEditing ? (
          <StyledContentTextarea
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
        ) : (
          diary.body
        )}
      </StyledContent>
      <StyledButtonContainer>
        {confPw ? (
          <ConfPwInputForm onSubmit={handleConfPwSubmit} />
        ) : isEditing ? (
          <StyledButtonContainer>
            <StyledSubmitButton onClick={handleSaveButtonClick}>
              완료
            </StyledSubmitButton>
            <StyledSubmitButton onClick={handleCancelButtonClick}>
              취소
            </StyledSubmitButton>
          </StyledButtonContainer>
        ) : (
          <StyledButtonContainer>
            <StyledSubmitButton onClick={handleEditButtonClick}>
              수정
            </StyledSubmitButton>
            <StyledSubmitButton
              onClick={() => handleDeleteButtonClick(diary.id)}
            >
              삭제
            </StyledSubmitButton>
          </StyledButtonContainer>
        )}
      </StyledButtonContainer>
    </StyledMain>
  );
};

const ConfPwInputForm = ({ onSubmit }) => {
  const [inputPw, setInputPw] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputPw);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="password"
        value={inputPw}
        onChange={(e) => setInputPw(e.target.value)}
        placeholder="비밀번호를 입력하세요"
      />
      <StyledSubmitButton type="submit">확인</StyledSubmitButton>
    </form>
  );
};

export default Detail;

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

const StyledMood = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: #293241;
`;

const StyledMoodSelect = styled.select`
  padding: 10px;
  font-size: 16px;
`;

const StyledContent = styled.p`
  font-size: 16px;
  margin-top: 10px;
  color: #293241;
`;

const StyledContentTextarea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  font-size: 16px;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;
