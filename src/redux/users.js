import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../config/api.config";

export const initialState = {
  loading: false,
  hasError: false,
  connecting: false,
  disconnectig: false,
  userConnected: {},
  users: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getuser: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    getuserOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.users = payload;
    },

    getuserFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.users = [];
    },

    getusers: (state) => {
      state.hasError = false;
      state.loading = true;
    },

    getusersOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.users = payload;
    },

    getusersFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.users = [...state.users];
    },

    createuser: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    createuserOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.users = [...state.users, payload];
    },

    createuserFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    updateuser: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    updateuserOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      console.log(payload);
      const index = state.users.findIndex((item) => payload._id === item._id);
      if (index > -1) {
        const item = state.users[index];
        console.log({ ...item, ...payload });
        state.users.splice(index, 1, { ...item, ...payload });
      }
    },

    updateuserFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    deleteuser: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    deleteuserOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.users = [...state.users.filter((user) => user._id !== payload)];
    },
    deleteuserFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

// Actions
export const {
  getuser,
  getuserOk,
  getuserFail,
  getusers,
  getusersOk,
  getusersFail,
  updateuser,
  updateuserOk,
  updateuserFail,
  createuser,
  createuserOk,
  createuserFail,
  deleteuser,
  deleteuserOk,
  deleteuserFail,
} = usersSlice.actions;

//Selector
export const usersSelector = (state) => state.users;

// Reducer
export default usersSlice.reducer;

//Fetch all
export function fetchUsers(obj) {
  return async (dispatch) => {
    dispatch(getusers());
    try {
      const response = await instance.post("/user/find", obj);
      console.log(response);
      dispatch(getusersOk(response.data));
    } catch (error) {
      dispatch(getusersFail());
    }
  };
}

//Fetch one
export function fetchUser(id, obj) {
  return async (dispatch) => {
    console.log(id);
    dispatch(getuser());
    try {
      const response = await instance.post(`user/findbyId/${id}`, obj);
      console.log(response);
      dispatch(getuserOk(response.data));
    } catch (error) {
      dispatch(getuserFail());
    }
  };
}

////Update
export function UpdateUser(id, user) {
  return async (dispatch) => {
    dispatch(updateuser());
    try {
      const response = await instance.post(`user/update/${id}`, user);
      console.log(response);
      dispatch(updateuserOk(response.data));
    } catch (error) {
      dispatch(updateuserFail());
    }
  };
}
//Thunk
export function CreateUser(user) {
  return async (dispatch) => {
    console.log("reducer");
    console.log(user);
    dispatch(createuser());
    try {
      console.log(user);
      const response = await instance.post(
        `user/create/${user.customer}`,
        user
      );
      console.log(response);
      dispatch(createuserOk(response.data));
    } catch (error) {
      console.log(error);
      dispatch(createuserFail());
    }
  };
}

//Delete
export function DeleteUser(userId) {
  return async (dispatch) => {
    dispatch(deleteuser());
    try {
      const response = await instance.post(`user/delete/${userId}`);
      console.log(response);
      dispatch(deleteuserOk(userId, response.data));
    } catch (error) {
      dispatch(deleteuserFail());
    }
  };
}
