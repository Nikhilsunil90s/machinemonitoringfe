import { createSlice } from "@reduxjs/toolkit";
import { instance } from "../config/api.config";

export const initialState = {
  loading: false,
  hasError: false,
  ioError: false,
  machines: [],
};

const machinesSlice = createSlice({
  name: "machines",
  initialState,
  reducers: {
    getMachine: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    getMachineOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.machines = payload;
    },

    getMachineFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.machines = [];
    },

    getActiveMachines: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    getActiveMachinesOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.machines = payload;
    },

    getActiveMachinesFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.machines = [];
    },

    getMachines: (state) => {
      state.hasError = false;
      state.loading = true;
    },

    getMachinesOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.machines = payload;
    },

    getMachinesFail: (state) => {
      state.loading = false;
      state.hasError = true;
      state.machines = [...state.machines];
    },

    createMachine: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    createMachineOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.machines = [...state.machines, payload];
    },

    createMachineFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    updateMachine: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    updateMachineOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      console.log(payload);
      const index = state.machines.findIndex(
        (item) => payload._id === item._id
      );
      if (index > -1) {
        const item = state.machines[index];
        console.log({ ...item, ...payload });
        state.machines.splice(index, 1, { ...item, ...payload });
      }
    },

    updateMachineFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    deleteMachine: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    deleteMachineOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.machines = [
        ...state.machines.filter((machine) => machine._id !== payload),
      ];
    },
    connectMachineFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    connectMachine: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    connectMachineOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      const index = state.machines.findIndex(
        (item) => payload._id === item._id
      );
      if (index > -1) {
        const item = state.machines[index];
        state.machines.splice(index, 1, { ...item, ...payload });
      }
    },

    disconnectMachineFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },
    disconnectMachine: (state) => {
      state.hasError = false;
      state.loading = true;
    },
    disconnectMachineOk: (state, { payload }) => {
      state.loading = false;
      state.hasError = false;
      state.machines = payload;

      // const index = state.machines.findIndex(
      //   (item) => payload._id === item._id
      // );
      // console.log("Disconnect :", state.machines);
      // if (index > -1) {
      //   const item = state.machines[index];

      //   state.machines.splice(index, 1, { ...item, ...payload });
      // }
    },

    deleteMachineFail: (state) => {
      state.loading = false;
      state.hasError = true;
    },

    ioLiveMachine: (state) => {
      state.loading = true;
      state.ioError = false;
    },
    ioLiveMachineOk: (state, { payload }) => {
      state.loading = false;
      state.ioError = false;
      if (payload) {
        try {
          const jPayload = JSON.parse(payload);
          const { messages, machine, ...toicRev } = jPayload.topicMachine;
          const UpdatedMachine = {
            ...toicRev,
            message: jPayload.message,
          };
          let machineIndex = state.machines.findIndex(
            (item) => jPayload.topicMachine.machine._id === item._id
          );
          if (machineIndex > -1) {
            let TopicIndex = state.machines[machineIndex].topics.findIndex(
              (item) => jPayload.topicMachine._id === item._id
            );
            if (TopicIndex > -1) {
              state.machines[machineIndex].topics.splice(
                TopicIndex,
                1,
                UpdatedMachine
              );
            }
          }
        } catch (error) {}
      }
    },
    ioLiveMachineFail: (state) => {
      state.loading = false;
      state.ioError = true;
    },
  },
});

// Actions
export const {
  getMachine,
  getMachineOk,
  getMachineFail,
  getActiveMachines,
  getActiveMachinesOk,
  getActiveMachinesFail,
  getMachines,
  getMachinesOk,
  getMachinesFail,
  updateMachine,
  updateMachineOk,
  updateMachineFail,
  createMachine,
  createMachineOk,
  createMachineFail,
  deleteMachine,
  deleteMachineOk,
  deleteMachineFail,
  connectMachine,
  connectMachineOk,
  connectMachineFail,
  disconnectMachine,
  disconnectMachineOk,
  disconnectMachineFail,
  ioLiveMachine,
  ioLiveMachineOk,
  ioLiveMachineFail,
} = machinesSlice.actions;

//Selector
export const machinesSelector = (state) => state.machines;

// Reducer
export default machinesSlice.reducer;

//Fetch All
export function FetchMachines() {
  return async (dispatch) => {
    dispatch(getMachines());
    try {
      const response = await instance.post("/machine/find");
      console.log(response);
      dispatch(getMachinesOk(response.data));
    } catch (error) {
      dispatch(getMachinesFail());
    }
  };
}

//Fetch active machine by customer
export function FetchActiveMachines(custumerId, screenNum) {
  return async (dispatch) => {
    dispatch(getActiveMachines());
    try {
      const response = await instance.post(
        `/machine/activeByCustomer/${custumerId}`,
        { screenNumber: screenNum }
      );
      console.log(response);
      dispatch(getActiveMachinesOk(response.data));
    } catch (error) {
      dispatch(getActiveMachinesFail());
    }
  };
}

//Fetch one
export function FetchMachine(id) {
  return async (dispatch) => {
    console.log(id);
    dispatch(getMachine());
    try {
      const response = await instance.post(`machine/findbyId/${id}`);
      console.log(response);
      dispatch(getMachineOk(response.data));
    } catch (error) {
      dispatch(getMachineFail());
    }
  };
}

////Update
export function UpdateMachine(id, machine) {
  return async (dispatch) => {
    dispatch(updateMachine());
    try {
      const response = await instance.post(`machine/update/${id}`, machine);
      console.log(response);
      dispatch(updateMachineOk(response.data));
    } catch (error) {
      dispatch(updateMachineFail());
    }
  };
}
//Thunk
export function CreateMachine(machine) {
  return async (dispatch) => {
    console.log("reducer");
    console.log(machine);
    dispatch(createMachine());
    try {
      console.log(machine);
      const response = await instance.post(
        `machine/create/${machine.customer}`,
        machine
      );
      console.log(response);
      dispatch(createMachineOk(response.data));
    } catch (error) {
      console.log(error);
      dispatch(createMachineFail());
    }
  };
}

//Delete
export function DeleteMachine(machineId) {
  return async (dispatch) => {
    dispatch(deleteMachine());
    try {
      const response = await instance.post(`machine/delete/${machineId}`);
      console.log(response);
      dispatch(deleteMachineOk(machineId, response.data));
    } catch (error) {
      dispatch(deleteMachineFail());
    }
  };
}

//Connect machine topic
export function ConnectMachine(machineId, topicId) {
  return async (dispatch) => {
    dispatch(connectMachine());
    try {
      const response = await instance.post(
        `machine/connectTopic/${machineId}/${topicId}`
      );
      console.log(response);
      dispatch(connectMachineOk(response.data));
    } catch (error) {
      dispatch(connectMachineFail());
    }
  };
}
//Disconnect machine topic
export function DisconnectMachine(machineId, topicId) {
  return async (dispatch) => {
    dispatch(disconnectMachine());
    try {
      const response = await instance.post(
        `machine/disconnectTopic/${machineId}/${topicId}`
      );
      console.log(response);
      dispatch(disconnectMachineOk(response.data));
    } catch (error) {
      dispatch(disconnectMachineFail());
    }
  };
}

//IO live machine connection
export function IOMachineConnect(payload) {
  return async (dispatch) => {
    //console.log(payload);
    dispatch(ioLiveMachine());
    try {
      dispatch(ioLiveMachineOk(payload));
    } catch (error) {
      console.log(error);
      dispatch(ioLiveMachineFail());
    }
  };
}

// let machines = [...state.machines];
// machines[machineIndex] = {
//   ...machines[machineIndex],
//   topics: [
//     ...machines[machineIndex].topics,
//     machines[machineIndex].topics.splice(
//       TopicIndex,
//       1,
//       UpdatedMchine
//     ),
//   ],
// };
// console.log("machines", machines);
// state.machines = machines;
