import axios from "axios";

// GET
// POST
// PUT
// PATCH
// DELETE
// id=${email}: 쿼리파라미터
const getNickname = async (email) => {
  const response = await axios.get(
    `${process.env.REACT_APP_JSON_URL}/nickname?id=${email}`
  );

  // 로그인한 유저에 email를 불러오기 방법
  // `${process.env.REACT_APP_JSON_URL}/nickname`
  // const activeNicknameObject = response.data.filter(function(item){
  //   return item.id === email
  // });

  // return activeNicknameObject;

  return response.data;
};

export { getNickname };
