import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { __getDiaries } from "../redux/modules/diarySlice";
import { useDispatch, useSelector } from "react-redux";

const Main = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isLoading, isError } = useSelector((state) => state.diary);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(__getDiaries());
    };
    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <h1>로딩중</h1>;
  }

  if (isError) {
    return <h1>오류중</h1>;
  }

  const handleDiaryItemClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <StyledMain>
      {data.map((item) => (
        <StyledDiaryBox
          key={item.id}
          onClick={() => handleDiaryItemClick(item.id)}
        >
          <StyledTitle>{item.title}</StyledTitle>
          <StyledDate>{item.createdAt}</StyledDate>
        </StyledDiaryBox>
      ))}
    </StyledMain>
  );
};

export default Main;

const StyledMain = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 0.5fr));
  grid-gap: 20px;
  padding: 20px;
`;

const StyledDiaryBox = styled.div`
  padding: 20px;
  background-color: #dbe9f6;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const StyledTitle = styled.h2`
  margin-top: 0;
  font-size: 18px;
  font-weight: bold;
  color: #293241;
`;

const StyledDate = styled.p`
  color: #888;
  font-size: 14px;
  margin-top: 5px;
`;
