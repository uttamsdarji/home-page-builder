const initialState = {
  loading: true
}

const editTemplateReducer = (state = initialState, action) => {
  switch(action.type) {
    case "SHOW_EDIT_TEMPLATE_LOADER":
      return {
        ...state,
        loading: action.show
      }
    default: 
      return state
  }
}

export default editTemplateReducer;