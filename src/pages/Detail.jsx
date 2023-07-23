import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { StyledSubmitButton } from "../components/Button";
import { __deleteDiary, __updateDiary } from "../redux/modules/diarySlice";

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.diary);

  const diary = data.find((item) => item.id === Number(id));

  const [isEditing, setIsEditing] = useState(false);
  const [editedMood, setEditedMood] = useState(diary.moodCode);
  const [editedBody, setEditedBody] = useState(diary.body);

  const handleSaveButtonClick = () => {
    // 서버에 업데이트할 내용 전송
    dispatch(
      __updateDiary({
        id: diary.id,
        moodCode: editedMood,
        body: editedBody,
      })
    );
    setIsEditing(false);
  };

  const handleCancelButtonClick = () => {
    setIsEditing(false);
  };

  const handleEditButtonClick = () => {
    setIsEditing(true);
  };
  const handleDeleteButtonClick = (id) => {
    dispatch(__deleteDiary(id));
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
        {isEditing ? (
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
