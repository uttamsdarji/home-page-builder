import {saveTemplateToLocalStorage, deleteTemplateFromLocalStorage} from '../../commonFunctions';

export function undoPhotoBlog() {
    return (dispatch,getState) => {
      dispatch({type: 'UNDO_photoBlog'})
      setTimeout(() => {
        dispatch(saveTemplateToLocalStorage('photoBlog'))
      },1000)
    }
  }
  
export function redoPhotoBlog() {
  return (dispatch,getState) => {
    dispatch({type: 'REDO_photoBlog'})
    setTimeout(() => {
      dispatch(saveTemplateToLocalStorage('photoBlog'))
    },1000)
  }
}

export function changeCoverPhoto(photo) {
  return (dispatch,getState) => {
    dispatch({type: 'CHANGE_photoBlog_COVER_PHOTO', photo})
    setTimeout(() => {
      dispatch(saveTemplateToLocalStorage('photoBlog'))
    },1000)
  }
}

export function changeUserPhoto(photo) {
  return (dispatch,getState) => {
    dispatch({type: 'CHANGE_photoBlog_USER_PHOTO', photo})
    setTimeout(() => {
      dispatch(saveTemplateToLocalStorage('photoBlog'))
    },1000)
  }
}

export function resetTemplate() {
  return (dispatch,getState) => {
    dispatch({type: "RESET_photoBlog_TEPLATE"})
    deleteTemplateFromLocalStorage('photoBlog');
  }
}

export function removeDefaultPhotos() {
  return (dispatch,getState) => {
    dispatch({type: "REMOVE_ALL_DEFAULT_photoBlog_PHOTOS"})
  }
}

export function addPhoto(photo) {
  return (dispatch,getState) => {
    dispatch({type: "ADD_photoBlog_PHOTO", photo})
    setTimeout(() => {
      dispatch(saveTemplateToLocalStorage('photoBlog'))
    },1000)
  }
}
