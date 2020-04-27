const initialState = {
  loginError: null
}

const authReducer = (state = initialState, action)  => {
  switch(action.type) {
    case "ADD_LOGIN_ERROR":
      return {
        ...state,
        loginError: action.error
      }
    default:
      return state;
  }
}

export default authReducer;