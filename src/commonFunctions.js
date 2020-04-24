export const getBase64Image = function(img) {
  var canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;

  var ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0);

  var dataURL = canvas.toDataURL("image/png");

  return dataURL;
}

export const saveTemplateToLocalStorage = (templateId) => {
  return (dispatch,getState) => {
    let template = getState()[templateId];
    localStorage.setItem(templateId, JSON.stringify(template));
  }
}

export const deleteTemplateFromLocalStorage = (templateId) => {
  localStorage.removeItem(templateId);
}

export const getTemplateFromStorage = (templateId) => {
  return (dispatch,getState) => {
    let template = localStorage.getItem(templateId);
    if(template) {
      let newState = JSON.parse(template)
      dispatch({type: `SAVE_${templateId}_FROM_STORAGE`, newState})
    }
  }
}