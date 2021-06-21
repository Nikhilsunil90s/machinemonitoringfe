import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../config/api.config";

export const initialState = {
  loading: false,
  hasError: false,
  customers: [],
};

const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    getCustomer: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    getCustomerOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.customers = payload;
    },

    getCustomerFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.customers = [];
    },

    getCustomers: (state) => {
      state.hasError = false;
      state.loading = true;
    },

    getCustomersOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.customers = payload;
    },

    getCustomersFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.customers = [...state.customers];
    },

    createCustomer: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    createCustomerOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.customers = [...state.customers, payload];
    },

    createCustomerFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    updateCustomer: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    updateCustomerOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      console.log(payload);
      const index = state.customers.findIndex(
        (item) => payload._id === item._id
      );
      if (index > -1) {
        const item = state.customers[index];
        console.log({ ...item, ...payload });
        state.customers.splice(index, 1, { ...item, ...payload });
      }
    },

    updateCustomerFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    deleteCustomer: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    deleteCustomerOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.customers = [
        ...state.customers.filter((customer) => customer._id !== payload),
      ];
    },

    deleteCustomerFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },
  },
});

// Actions
export const {
  getCustomer,
  getCustomerOk,
  getCustomerFail,
  getCustomers,
  getCustomersOk,
  getCustomersFail,
  updateCustomer,
  updateCustomerOk,
  updateCustomerFail,
  createCustomer,
  createCustomerOk,
  createCustomerFail,
  deleteCustomer,
  deleteCustomerOk,
  deleteCustomerFail,
} = customersSlice.actions;

//Selector
export const customersSelector = (state) => state.customers;

// Reducer
export default customersSlice.reducer;

//Fetch all
export function FetchCustomers(obj) {
  return async (dispatch) => {
    dispatch(getCustomers());
    try {
      const response = await instance.post("/customer/find", obj);
      console.log(response);
      dispatch(getCustomersOk(response.data));
    } catch (error) {
      dispatch(getCustomersFail());
    }
  };
}

//Fetch One
export function FetchCustomer(id) {
  return async (dispatch) => {
    console.log(id);
    dispatch(getCustomer());
    try {
      const response = await instance.post(`customer/findbyId/${id}`);
      console.log(response);
      dispatch(getCustomerOk(response.data));
    } catch (error) {
      dispatch(getCustomerFail());
    }
  };
}

////Update
export function UpdateCustomer(id, customer) {
  return async (dispatch) => {
    dispatch(updateCustomer());
    try {
      const response = await instance.post(`customer/update/${id}`, customer);
      console.log(response);
      dispatch(updateCustomerOk(response.data));
    } catch (error) {
      dispatch(updateCustomerFail());
    }
  };
}
//Thunk
export function CreateCustomer(customer) {
  return async (dispatch) => {
    console.log("reducer");
    console.log(customer);
    dispatch(createCustomer());
    try {
      console.log(customer);
      const response = await instance.post(`customer/create/`, customer);
      console.log(response);
      dispatch(createCustomerOk(response.data));
    } catch (error) {
      console.log(error);
      dispatch(createCustomerFail());
    }
  };
}

//Delete
export function DeleteCustomer(customerId) {
  return async (dispatch) => {
    dispatch(deleteCustomer());
    try {
      const response = await instance.post(`customer/delete/${customerId}`);
      console.log(response);
      dispatch(deleteCustomerOk(customerId, response.data));
    } catch (error) {
      dispatch(deleteCustomerFail());
    }
  };
}
