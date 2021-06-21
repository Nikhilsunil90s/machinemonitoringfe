import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../config/api.config";

export const initialState = {
  loading: false,
  hasError: false,
  brokers: [],
};

const brokersSlice = createSlice({
  name: "brokers",
  initialState,
  reducers: {
    getBroker: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    getBrokerOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.brokers = payload;
    },

    getBrokerFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.brokers = [];
    },

    getBrokers: (state) => {
      state.hasError = false;
      state.loading = true;
    },

    getBrokersOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.brokers = payload;
    },

    getBrokersFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.brokers = [...state.brokers];
    },

    createBroker: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    createBrokerOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.brokers = [...state.brokers, payload];
    },

    createBrokerFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    updateBroker: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    updateBrokerOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      console.log(payload);
      const index = state.brokers.findIndex((item) => payload._id === item._id);
      if (index > -1) {
        const item = state.brokers[index];
        console.log({ ...item, ...payload });
        state.brokers.splice(index, 1, { ...item, ...payload });
      }
    },

    updateBrokerFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    deleteBroker: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    deleteBrokerOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.brokers = [
        ...state.brokers.filter((broker) => broker._id !== payload),
      ];
    },

    deleteBrokerFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

// Actions
export const {
  getBroker,
  getBrokerOk,
  getBrokerFail,
  getBrokers,
  getBrokersOk,
  getBroBersFail,
  updateBroker,
  updateBrokerOk,
  updateBrokerFail,
  createBroker,
  createBrokerOk,
  createBrokerFail,
  deleteBroker,
  deleteBrokerOk,
  deleteBrokerFail,
} = brokersSlice.actions;

//Selector
export const brokersSelector = (state) => state.brokers;

// Reducer
export default brokersSlice.reducer;

//Fetch One
export function FetchBrokers() {
  return async (dispatch) => {
    dispatch(getBrokers());
    try {
      const response = await instance.post("/device/find");
      console.log(response);
      dispatch(getBrokersOk(response.data));
    } catch (error) {
      dispatch(getBrokerFail());
    }
  };
}

//Fetch All
export function FetchBroker(id) {
  return async (dispatch) => {
    console.log(id);
    dispatch(getBroker());
    try {
      const response = await instance.post(`device/findbyId/${id}`);
      console.log(response);
      dispatch(getBrokerOk(response.data));
    } catch (error) {
      dispatch(getBrokerFail());
    }
  };
}

////Update
export function UpdateBroker(id, broker) {
  return async (dispatch) => {
    dispatch(updateBroker());
    try {
      const response = await instance.post(`device/update/${id}`, broker);
      console.log(response);
      dispatch(updateBrokerOk(response.data));
    } catch (error) {
      dispatch(updateBrokerFail());
    }
  };
}
//Thunk
export function CreateBroker(broker) {
  return async (dispatch) => {
    dispatch(createBroker());
    try {
      console.log(broker);
      const response = await instance.post(`device/create`, broker);
      console.log(response);
      dispatch(createBrokerOk(response.data));
    } catch (error) {
      console.log(error);
      dispatch(createBrokerFail());
    }
  };
}

//Delete
export function DeleteBroker(brokerId) {
  return async (dispatch) => {
    dispatch(deleteBroker());
    try {
      const response = await instance.post(`device/delete/${brokerId}`);
      console.log(response);
      dispatch(deleteBrokerOk(brokerId, response.data));
    } catch (error) {
      console.log(error);
      dispatch(deleteBrokerFail());
    }
  };
}
