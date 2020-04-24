import {saveTemplateToLocalStorage} from '../../commonFunctions';

export function editTextField(templateId,fieldKey,fieldValue) {
  return (dispatch,getState) => {
    dispatch({ type: `EDIT_${templateId}_TEXT_FIELD`, fieldKey, fieldValue})
    setTimeout(() => {
      dispatch(saveTemplateToLocalStorage(templateId))
    },1000)
  }
}