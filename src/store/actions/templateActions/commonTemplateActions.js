export const saveTemplateToLocalStorage = (templateId) => {
  return (dispatch,getState) => {
    let template = getState()[templateId];
    // localStorage.setItem(templateId, JSON.stringify(template));
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

export function editTextField(templateId,fieldKey,fieldValue) {
  return (dispatch,getState) => {
    dispatch({ type: `EDIT_${templateId}_TEXT_FIELD`, fieldKey, fieldValue})
    setTimeout(() => {
      dispatch(saveTemplateToLocalStorage(templateId))
    },1000)
  }
}

export const getHTMLHeader = (title) => {
  let header = `<head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                <meta name="description" content="Modern e-commerce fulfilment, built for speed
                We store your inventory closer to your demand, allowing you to offer same-day/next-day delivery">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
                <link href="https://fonts.googleapis.com/css?family=Poppins:thin,thinItalic,extra-light,extra-lightItalic,regular,regularItalic,medium,mediumItalic,semi-bold,semi-boldItalic,bold,boldItalic"
                rel="stylesheet">
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
                <link rel="stylesheet" href="style.css">
                <title>${title}</title>
                <script src="https://kit.fontawesome.com/84badbad96.js" crossorigin="anonymous"></script>
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
              </head>`
  return header;
}