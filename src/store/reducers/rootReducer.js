import { combineReducers } from 'redux';
import authReducer from './authReducer';
import basicDataReducer from './basicDataReducer';
import allTemplatesReducer from './allTemplatesReducer';
import editTemplateReducer from './editTemplateReducer';
import photoBlogReducer from './templateReducers/photoBlogReducer'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
  auth: authReducer,
  basicData: basicDataReducer,
  allTemplates: allTemplatesReducer,
  editTemplate: editTemplateReducer,
  photoBlog: photoBlogReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});