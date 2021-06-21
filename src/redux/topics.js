import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../config/api.config";

export const initialState = {
  loading: false,
  hasError: false,
  topics: [],
};

const topicsSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    getTopic: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    getTopicOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.topics = payload;
    },

    getTopicFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.topics = [];
    },

    getTopics: (state) => {
      state.hasError = false;
      state.loading = true;
    },

    getTopicsOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.topics = payload;
    },

    getTopicsFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.topics = [...state.topics];
    },

    createTopic: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    createTopicOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.topics = [...state.topics, payload];
    },

    createTopicFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    updateTopic: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    updateTopicOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      console.log(payload);
      const index = state.topics.findIndex((item) => payload._id === item._id);
      if (index > -1) {
        const item = state.topics[index];
        console.log({ ...item, ...payload });
        state.topics.splice(index, 1, { ...item, ...payload });
      }
    },

    updateTopicFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    deleteTopic: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    deleteTopicOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.topics = [...state.topics.filter((topic) => topic._id !== payload)];
    },

    deleteTopicFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    publishTopic: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    publishTopicOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      // state.topics = [...state.topics.filter((topic) => topic._id !== payload)];
    },

    publishTopicFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

// Actions
export const {
  getTopic,
  getTopicOk,
  getTopicFail,
  getTopics,
  getTopicsOk,
  getTopicsFail,
  updateTopic,
  updateTopicOk,
  updateTopicFail,
  createTopic,
  createTopicOk,
  createTopicFail,
  deleteTopic,
  deleteTopicOk,
  deleteTopicFail,
  publishTopic,
  publishTopicOk,
  publishTopicFail,
} = topicsSlice.actions;

//Selector
export const topicsSelector = (state) => state.topics;

// Reducer
export default topicsSlice.reducer;

//Fetch all
export function FetchTopics(obj) {
  return async (dispatch) => {
    dispatch(getTopics());
    try {
      const response = await instance.post("/topic/find", obj);
      console.log(response);
      dispatch(getTopicsOk(response.data));
    } catch (error) {
      dispatch(getTopicsFail());
    }
  };
}

//Fetch one
export function FetchTopic(id) {
  return async (dispatch) => {
    console.log(id);
    dispatch(getTopic());
    try {
      const response = await instance.post(`topic/findbyId/${id}`);
      console.log(response);
      dispatch(getTopicOk(response.data));
    } catch (error) {
      dispatch(getTopicFail());
    }
  };
}

////Update
export function UpdateTopic(id, topic) {
  return async (dispatch) => {
    dispatch(updateTopic());
    try {
      const response = await instance.post(`topic/update/${id}`, topic);
      console.log(response);
      dispatch(updateTopicOk(response.data));
    } catch (error) {
      dispatch(updateTopicFail());
    }
  };
}
//Thunk
export function CreateTopic(topic) {
  return async (dispatch) => {
    console.log("reducer");
    console.log(topic);
    dispatch(createTopic());
    try {
      console.log(topic);
      const response = await instance.post(
        `topic/create/${topic.device}`,
        topic
      );
      console.log(response);
      dispatch(createTopicOk(response.data));
    } catch (error) {
      console.log(error);
      dispatch(createTopicFail());
    }
  };
}

//Delete
export function DeleteTopic(topicId) {
  return async (dispatch) => {
    dispatch(deleteTopic());
    try {
      const response = await instance.post(`topic/delete/${topicId}`);
      console.log(response);
      dispatch(deleteTopicOk(topicId, response.data));
    } catch (error) {
      dispatch(deleteTopicFail());
    }
  };
}
//Publish
export function PublishTopic(deviceId, topicId, message) {
  return async (dispatch) => {
    dispatch(publishTopic());
    try {
      console.log("pub");
      const response = await instance.post(
        `/topic/publish/${deviceId}/${topicId}`,
        message
      );
      console.log(response);
      dispatch(publishTopicOk(topicId, response.data));
    } catch (error) {
      dispatch(publishTopicFail());
    }
  };
}
