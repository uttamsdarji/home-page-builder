import image2base64 from 'image-to-base64';
import {getHTMLHeader} from './commonTemplateActions';
import cssExport from '../../../components/templates/PhotoblogTemplate/exportStyle';
import JSZip from 'jszip';
import {saveAs} from 'file-saver';

export function changeCoverPhoto(photo,notEdited) {
  return (dispatch,getState) => {
    dispatch({type: 'CHANGE_photoBlog_COVER_PHOTO', image: photo.image, file: photo.file, notEdited})
  }
}

export function changeUserPhoto(photo,notEdited) {
  return (dispatch,getState) => {
    dispatch({type: 'CHANGE_photoBlog_USER_PHOTO', image: photo.image, file: photo.file, notEdited})
  }
}

export function removeDefaultPhotos() {
  return (dispatch,getState) => {
    dispatch({type: "REMOVE_ALL_DEFAULT_photoBlog_PHOTOS"})
  }
}

export function addPhoto(photo, index, notEdited) {
  return (dispatch,getState) => {
    dispatch({type: "ADD_photoBlog_PHOTO", image: photo.image, file: photo.file, index, notEdited})
  }
}

export function deletePhoto(index) {
  return (dispatch,getState) => {
    dispatch({type: "DELETE_photoBlog_PHOTO", index})
  }
}

var base64regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;

export function convertImagestoBase64() {
  return (dispatch,getState) => {
    let state = getState().photoBlog.data.photos;
    let coverPhoto = state.coverImage;
    let userImage = state.userImage;
    let photos = state.otherPhotos;
    if(!base64regex.test(coverPhoto.image)) {
      image2base64(coverPhoto.image).then(
          (response) => {
              let dataUrl = 'data:image/png;base64,'+ response;
              dispatch(changeCoverPhoto({image: dataUrl, file: coverPhoto.file},true))
          }
        )
    }
    if(!base64regex.test(userImage.image)) {
      image2base64(userImage.image).then(
          (response) => {
              let dataUrl = 'data:image/png;base64,'+ response;
              dispatch(changeUserPhoto({image: dataUrl, file: userImage.file},true))
          }
        )
    }
    photos.length > 0 && photos.forEach((photo,index) => {
      if(!base64regex.test(photo.image)) {
        image2base64(photo.image).then(
            (response) => {
                let dataUrl = 'data:image/png;base64,'+ response;
                dispatch(addPhoto({image: dataUrl, file: photo.file},index,true))
            }
          )
      }
    })
  }
}

export function downloadTemplate() {
  return (dispatch,getState) => {
    dispatch({type: "SHOW_DOWNLOAD_photoBlog_LOADER", show: true})
    dispatch({type: "PREPARE_photoBlog_DOWNLOAD"});
    setTimeout(() => {
      let state = getState().photoBlog;
      let title = state.data.textFields.navBrand;
      let header = getHTMLHeader(title || '');
      let photos = state.data.photos;
      let template = document.querySelector('.template-preview').outerHTML;
      let html = `<!DOCTYPE html>
                      <html lang="en">
                      ${header}
                      <body data-spy="scroll" data-target="#yourNavId" data-offset="100">
                      ${template}
                      </body>
                      </html>`
      let zip = new JSZip();
      let img = zip.folder("images");
      if(photos.coverImage && photos.coverImage.fileUrl) {
        img.file(photos.coverImage.file.name,photos.coverImage.file)
      }
      if(photos.userImage && photos.userImage.fileUrl) {
        img.file(photos.userImage.file.name,photos.userImage.file)
      }
      photos.otherPhotos && photos.otherPhotos.length > 0 && photos.otherPhotos.map((photo) => {
        if(photo && photo.fileUrl) {
          img.file(photo.file.name,photo.file)
        }
      })
      zip.file("index.html", html);
      zip.file("style.css",cssExport);
      zip.generateAsync({type:"blob"}).then(function(content) {
        saveAs(content, "photoBlog.zip");
        dispatch({type: "RESET_photoBlog_PHOTOS_AFTER_DOWNLOAD"})
        dispatch({type: "SHOW_DOWNLOAD_photoBlog_LOADER", show: false})
      });
    },500)
  }
}
