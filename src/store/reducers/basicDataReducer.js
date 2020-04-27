const initialState = {
  loading: true
}

const basicDataReducer =  (state = initialState,action) => {
  switch(action.type) {
    case "SHOW_MAIN_LOADER":
      return {
        ...state,
        loading: action.show
      }
    default:
      return state;
  }
}

 export default basicDataReducer;