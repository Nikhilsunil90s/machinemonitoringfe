import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../config/api.config";

export const initialState = {
  loading: false,
  hasError: false,
  ioConnectig: false,
  ioConnected: false,
  ioError: false,
  messages: [],
};

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    getMessage: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    getMessageOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.messages = payload;
    },

    getMessageFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.messages = [];
    },

    getMessages: (state) => {
      state.hasError = false;
      state.loading = true;
    },

    getMessagesOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.messages = payload;
    },

    getMessagesFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.messages = [...state.messages];
    },

    createMessage: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    createMessageOk: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.hasError = false;
      state.messages = [...state.messages, payload];
    },

    createMessageFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    updateMessage: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    updateMessageOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      console.log(payload);
      const index = state.messages.findIndex(
        (item) => payload._id === item._id
      );
      if (index > -1) {
        const item = state.messages[index];
        state.messages.splice(index, 1, { ...item, ...payload });
      }
    },

    updateMessageFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    deleteMessage: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    deleteMessageOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      payload.map(
        (msg) =>
          (state.messages = [
            ...state.messages.filter((message) => message._id !== msg._id),
          ])
      );
    },
    deleteMessageFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    ioConnect: (state) => {
      state.ioConnectig = false;
      state.ioConnected = false;
      state.ioError = false;
    },
    ioConnectionOk: (state, { payload }) => {
      state.ioConnectig = false;
      state.ioConnected = true;
      state.ioError = false;
      if (payload) {
        const jPayload = JSON.parse(payload);
        const message = { ...jPayload.message, topic: jPayload.topicMachine };
        console.log("IO connect Ok", message);
        state.messages = [...state.messages, message];
      }
    },
    ioConnectionFail: (state) => {
      state.ioConnectig = false;
      state.ioConnected = false;
      state.ioError = false;
    },
  },
});

// Actions
export const {
  getMessage,
  getMessageOk,
  getMessageFail,
  getMessages,
  getMessagesOk,
  getMessagesFail,
  updateMessage,
  updateMessageOk,
  updateMessageFail,
  createMessage,
  createMessageOk,
  createMessageFail,
  deleteMessage,
  deleteMessageOk,
  deleteMessageFail,
  ioConnect,
  ioConnectionOk,
  ioConnectionFail,
} = messagesSlice.actions;

//Selector
export const messagesSelector = (state) => state.messages;

// Reducer
export default messagesSlice.reducer;

//Fetch all
export function FetchMessages(obj) {
  return async (dispatch) => {
    dispatch(getMessages());
    try {
      const response = await instance.post("/message/messagebytopic", obj);
      console.log(response);
      dispatch(getMessagesOk(response.data));
    } catch (error) {
      dispatch(getMessagesFail());
    }
  };
}

//Fetch one
export function FetchMessage(id) {
  return async (dispatch) => {
    console.log(id);
    dispatch(getMessage());
    try {
      const response = await instance.post(`message/findbyId/${id}`);
      console.log(response);
      dispatch(getMessageOk(response.data));
    } catch (error) {
      dispatch(getMessageFail());
    }
  };
}

////Update
export function UpdateMessage(id, message) {
  return async (dispatch) => {
    dispatch(updateMessage());
    try {
      const response = await instance.post(`message/update/${id}`, message);
      console.log(response);
      dispatch(updateMessageOk(response.data));
    } catch (error) {
      dispatch(updateMessageFail());
    }
  };
}
//Thunk
export function CreateMessage(message) {
  return async (dispatch) => {
    console.log("reducer");
    console.log(message);
    dispatch(createMessage());
    try {
      console.log(message);
      const response = await instance.post(`message/create/`, message);
      console.log(response);
      dispatch(createMessageOk(response.data));
    } catch (error) {
      console.log(error);
      dispatch(createMessageFail());
    }
  };
}

//Delete
export function DeleteMessage(messageId, obj) {
  return async (dispatch) => {
    dispatch(deleteMessage());
    try {
      const response = await instance.post(`message/delete/${messageId}`, obj);
      console.log(response);
      dispatch(deleteMessageOk(response.data));
    } catch (error) {
      console.log(error);
      dispatch(deleteMessageFail());
    }
  };
}

//IO live message from the machine
export function IOConnection(payload) {
  return async (dispatch) => {
    dispatch(ioConnect());
    try {
      dispatch(ioConnectionOk(payload));
    } catch (error) {
      dispatch(ioConnectionFail());
    }
  };
}
