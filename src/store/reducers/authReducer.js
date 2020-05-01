const initialState = {
  loginError: null,
  signupError: null
}

const authReducer = (state = initialState, action)  => {
  switch(action.type) {
    case "ADD_LOGIN_ERROR":
      return {
        ...state,
        loginError: action.error
      }
    case "ADD_SIGNUP_ERROR":
      return {
        ...state,
        signupError: action.error
      }
    default:
      return state;
  }
}

export default authReducer;