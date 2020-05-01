import {photoBlogDetailData} from "../../../components/templates/PhotoblogTemplate/photoBlogData";

const initialState = {
  data: photoBlogDetailData,
  prevState: [],
  nextState: [],
  templateEdited: false,
  photoDataBeforeDownlaod: {},
  downloadLoading: false
}

const photoBlogReducer = (state = initialState, action) => {
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
      if(action.notEdited) {
        return {
          ...state,
          data: {
            ...state.data,
            photos: {
              ...state.data.photos,
              coverImage: {
                image: action.image,
                file: action.file
              }
            }
          }
        }
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            photos: {
              ...state.data.photos,
              coverImage: {
                image: action.image,
                file: action.file
              }
            }
          },
          prevState: state.prevState.concat([{...state.data}]),
          nextState: [],
          templateEdited: true
        }
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
          photos: {
            ...state.data.photos,
            otherPhotos: []
          }
        },
        prevState: state.prevState.concat([{...state.data}]),
        nextState: [],
      }
    case "ADD_photoBlog_PHOTO":
      if(action.notEdited) {
        let newPhotos = [...state.data.photos.otherPhotos];
        newPhotos[action.index] = {image: action.image, file: action.file};
        return {
          ...state,
          data: {
            ...state.data,
            photos: {
              ...state.data.photos,
              otherPhotos: newPhotos
            }
          }
        }
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            photos: {
              ...state.data.photos,
              otherPhotos: state.data.photos.otherPhotos.concat([{image: action.image, file: action.file}])
            }
          },
          prevState: state.prevState.concat([{...state.data}]),
          nextState: [],
          templateEdited: true
        }
      }
    case "CHANGE_photoBlog_USER_PHOTO":
      if(action.notEdited) {
        return {
          ...state,
          data: {
            ...state.data,
            photos: {
              ...state.data.photos,
              userImage: {
                image: action.image,
                file: action.file
              }
            }
          }
        }
      } else {
        return {
          ...state,
          data: {
            ...state.data,
            photos: {
              ...state.data.photos,
              userImage: {
                image: action.image,
                file: action.file
              }
            }
          },
          prevState: state.prevState.concat([{...state.data}]),
          nextState: [],
          templateEdited: true
        }
      }
    case "SAVE_photoBlog_FROM_STORAGE":
      return {
        ...state,
        data : {
          ...action.newState,
          photos: {
            ...state.data.photos
          }
        }
      }
    case "PREPARE_photoBlog_DOWNLOAD": 
      return {
        ...state,
        data: {
          ...state.data,
          photos: {
            coverImage: {
              ...state.data.photos.coverImage,
              fileUrl: state.data.photos.coverImage.file ? `images/${state.data.photos.coverImage.file.name}` : null
            },
            userImage: {
              ...state.data.photos.userImage,
              fileUrl: state.data.photos.userImage.file ? `images/${state.data.photos.userImage.file.name}` : null
            },
            otherPhotos: state.data.photos.otherPhotos.map((photo) => {
              return {
                ...photo,
                fileUrl: photo.file ? `images/${photo.file.name}` : null
              }
            })
          }
        },
        photoDataBeforeDownlaod: {...state.data.photos}
      }
    case "RESET_photoBlog_PHOTOS_AFTER_DOWNLOAD":
      return {
        ...state,
        data: {
          ...state.data,
          photos: {...state.photoDataBeforeDownlaod}
        },
        photoDataBeforeDownlaod: {}
      }
    case "SHOW_DOWNLOAD_photoBlog_LOADER": 
      return {
        ...state,
        downloadLoading: action.show
      }
    default:
      return state
  }
}

export default photoBlogReducer;
