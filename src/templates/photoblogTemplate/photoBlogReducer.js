import {photoBlogDetailData} from './photoBlogData';

const initialState = {
  data: photoBlogDetailData,
  prevState: [],
  nextState: [],
  templateEdited: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case "EDIT_photoBlog_TEXT_FIELD": 
      return {
        ...state,
        data: {
          ...state.data,
          textFields: {
            ...state.data.textFields,
            [action.fieldKey]: action.fieldValue
          }
        },
        prevState: state.prevState.concat([{...state.data}]),
        nextState: [],
        templateEdited: true
      }
    case "UNDO_photoBlog":
      return {
        ...state,
        data: {...state.prevState[state.prevState.length - 1]},
        prevState: state.prevState.slice(0,state.prevState.length - 1),
        nextState: state.nextState.concat([{...state.data}])
      }
    case "REDO_photoBlog":
      return {
        ...state,
        data: {...state.nextState[state.nextState.length - 1]},
        prevState: state.prevState.concat([{...state.data}]),
        nextState: state.nextState.slice(0,state.nextState.length -1)
      }
    case "CHANGE_photoBlog_COVER_PHOTO":
      return {
        ...state,
        data: {
          ...state.data,
          coverImage: action.photo
        },
        prevState: state.prevState.concat([{...state.data}]),
        nextState: [],
        templateEdited: true
      }
    case "RESET_photoBlog_TEPLATE":
      return {
        ...initialState
      }
    case "REMOVE_ALL_DEFAULT_photoBlog_PHOTOS":
      return {
        ...state,
        data: {
          ...state.data,
          photos: []
        }
      }
    case "ADD_photoBlog_PHOTO":
      return {
        ...state,
        data: {
          ...state.data,
          photos: state.data.photos.concat([action.photo])
        },
        prevState: state.prevState.concat([{...state.data}]),
        nextState: [],
        templateEdited: true
      }
    case "CHANGE_photoBlog_USER_PHOTO":
      return {
        ...state,
        data: {
          ...state.data,
          userImage: action.photo
        },
        prevState: state.prevState.concat([{...state.data}]),
        nextState: [],
        templateEdited: true
      }
    case "SAVE_photoBlog_FROM_STORAGE":
      return {
        ...action.newState
      }
    default:
      return state
  }
}
