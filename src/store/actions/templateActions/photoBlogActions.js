import {saveTemplateToLocalStorage, deleteTemplateFromLocalStorage} from './commonTemplateActions';
import image2base64 from 'image-to-base64';

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

export function changeCoverPhoto(photo,notEdited) {
  return (dispatch,getState) => {
    dispatch({type: 'CHANGE_photoBlog_COVER_PHOTO', photo, notEdited})
    setTimeout(() => {
      dispatch(saveTemplateToLocalStorage('photoBlog'))
    },1000)
  }
}

export function changeUserPhoto(photo,notEdited) {
  return (dispatch,getState) => {
    dispatch({type: 'CHANGE_photoBlog_USER_PHOTO', photo, notEdited})
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

export function addPhoto(photo, index, notEdited) {
  return (dispatch,getState) => {
    dispatch({type: "ADD_photoBlog_PHOTO", photo, index, notEdited})
    setTimeout(() => {
      dispatch(saveTemplateToLocalStorage('photoBlog'))
    },1000)
  }
}

var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export function convertImagestoBase64() {
  return (dispatch,getState) => {
    let state = getState().photoBlog.data;
    let coverPhoto = state.coverImage;
    let userImage = state.userImage;
    let photos = state.photos;
    if(!base64regex.test(coverPhoto)) {
      image2base64(coverPhoto).then(
          (response) => {
              let dataUrl = 'data:image/png;base64,'+ response;
              dispatch(changeCoverPhoto(dataUrl,true))
          }
        )
    }
    if(!base64regex.test(userImage)) {
      image2base64(userImage).then(
          (response) => {
              let dataUrl = 'data:image/png;base64,'+ response;
              dispatch(changeUserPhoto(dataUrl,true))
          }
        )
    }
    photos.length > 0 && photos.forEach((photo,index) => {
      if(!base64regex.test(photo)) {
        image2base64(photo).then(
            (response) => {
                let dataUrl = 'data:image/png;base64,'+ response;
                dispatch(addPhoto(dataUrl,index,true))
            }
          )
      }
    })
  }
}

