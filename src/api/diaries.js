import axios from "axios";

const getDiaries = async () => {
  const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/diary`);
  return response.data;
};

const addDiary = async (newDiary) => {
  await axios.post(`${process.env.REACT_APP_SERVER_URL}/diary`, newDiary);
};

const updateDiary = async (editedDiary) => {
  await axios.patch(
    `${process.env.REACT_APP_SERVER_URL}/diary/${editedDiary.id}`,
    {
      moodCode: editedDiary.moodCode,
      body: editedDiary.body,
    }
  );
};

const deleteDiary = async (id) => {
  await axios.delete(`${process.env.REACT_APP_SERVER_URL}/diary/${id}`, id);
};

export { getDiaries, addDiary, updateDiary, deleteDiary };
