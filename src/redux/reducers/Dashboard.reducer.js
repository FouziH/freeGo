const dashBoardReducer = (state = {}, action) => {
  switch (action.type) {
    case "SET_DASHBOARD":
      return action.payload;
    // case "SET_NOTIFICATION_DASHBOARD":
    //   return {}
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default dashBoardReducer;
