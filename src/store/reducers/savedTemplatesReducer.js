const initialState = {
  loading: true,
  savedTemplateIds: []
}

const savedTemplatesReducer = (state = initialState, action) => {
  switch(action.type) {
    case "SHOW_SAVED_TEMPLATES_LOADER":
      return {
        ...state,
        loading: action.show
      }
    case "ADD_SAVED_TEMPLATE_KEYS":
      return {
        ...state,
        savedTemplateIds: action.keys
      }
    default:
      return state;
  }
}

export default savedTemplatesReducer;