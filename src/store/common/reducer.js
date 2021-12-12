import { COMMON_DATA } from "./actionTypes";

export const initialState = {
  common_data: "",
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case COMMON_DATA:
      return {
        ...state,
        common_data: "common_data",
      };
    default:
      return state;
  }
}
