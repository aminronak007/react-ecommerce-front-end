let initialState = {};

export const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    default:
      return state;
  }
};
