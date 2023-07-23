import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
  error: null,
};

export const __getDiaries = createAsyncThunk(
  "diary/getDiaries",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/diary`
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __addDiary = createAsyncThunk(
  "diary/addDiary",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/diary`,
        payload
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __updateDiary = createAsyncThunk(
  "diary/editDiary",
  async (payload, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_SERVER_URL}/diary/${payload.id}`,
        { moodCode: payload.moodCode, body: payload.body }
      );
      return thunkAPI.fulfillWithValue(response.data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const __deleteDiary = createAsyncThunk(
  "diary/deleteDiary",
  async (payload, thunkAPI) => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/diary/${payload}`,
        payload
      );
      return thunkAPI.fulfillWithValue(payload);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const diarySlice = createSlice({
  name: "diary",
  initialState,
  reducers: {},
  extraReducers: {
    // 조회
    [__getDiaries.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = action.payload;
    },
    [__getDiaries.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__getDiaries.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    // 추가
    [__addDiary.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = [...state.data, action.payload];
    },
    [__addDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__addDiary.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    // 수정
    [__updateDiary.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = state.data.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            moodCode: action.payload.moodCode,
            body: action.payload.body,
          };
        }
        return item;
      });
    },
    [__updateDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__updateDiary.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },

    // 삭제
    [__deleteDiary.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    [__deleteDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = true;
      state.error = action.payload;
    },
    [__deleteDiary.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
  },
});

export const {} = diarySlice.actions;
export default diarySlice.reducer;
