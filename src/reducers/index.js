import { combineReducers } from 'redux';
import allTemplatesReducer from '../routes/allTemplates/allTemplatesReducer';
import editTemplateReducer from '../routes/editTemplate/editTemplateReducer';
import photoBlogReducer from '../templates/photoblogTemplate/photoBlogReducer';

export default combineReducers({
  allTemplates: allTemplatesReducer,
  editTemplate: editTemplateReducer,
  photoBlog: photoBlogReducer
});