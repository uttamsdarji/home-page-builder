const initialState = {
  loading: true,
  hideHeader: false
}

const basicDataReducer =  (state = initialState,action) => {
  switch(action.type) {
    case "SHOW_MAIN_LOADER":
      return {
        ...state,
        loading: action.show
      }
    case "TOGGLE_HEADER":
      return {
        ...state,
        hideHeader: action.flag
      }
    default:
      return state;
  }
}

 export default basicDataReducer;