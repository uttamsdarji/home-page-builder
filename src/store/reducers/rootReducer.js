import { combineReducers } from 'redux';
import authReducer from './authReducer';
import basicDataReducer from './basicDataReducer';
import allTemplatesReducer from './allTemplatesReducer';
import editTemplateReducer from './editTemplateReducer';
import savedTemplatesReducer from './savedTemplatesReducer';
import photoBlogReducer from './templateReducers/photoBlogReducer'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';

const appReducer = combineReducers({
  auth: authReducer,
  basicData: basicDataReducer,
  allTemplates: allTemplatesReducer,
  editTemplate: editTemplateReducer,
  savedTemplates: savedTemplatesReducer,
  photoBlog: photoBlogReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer
});

const rootReducer = (state,action) => {
  if(action.type == 'USER_LOGOUT') {
    state = undefined
  }
  return appReducer(state, action)
}

export default rootReducer;