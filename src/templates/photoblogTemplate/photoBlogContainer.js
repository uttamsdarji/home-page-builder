import {connect} from 'react-redux';
import PhotoBlog from './PhotoBlog';
import {undoPhotoBlog, redoPhotoBlog, changeCoverPhoto, resetTemplate, removeDefaultPhotos, addPhoto, changeUserPhoto} from './photoBlogModule';
import {getTemplateFromStorage} from '../../commonFunctions';

const mapStateToProps = (state) => ({
  data: state.photoBlog.data,
  prevData: state.photoBlog.prevState,
  nextData: state.photoBlog.nextState,
  templateEdited: state.photoBlog.templateEdited
})

const mapDispatchToProps = (dispatch)  => ({
  undoPhotoBlog: () => dispatch(undoPhotoBlog()),
  redoPhotoBlog: () => dispatch(redoPhotoBlog()),
  changeCoverPhoto: (photo) => dispatch(changeCoverPhoto(photo)),
  resetTemplate: () => dispatch(resetTemplate()),
  removeDefaultPhotos: () => dispatch(removeDefaultPhotos()),
  addPhoto: (photo) => dispatch(addPhoto(photo)),
  changeUserPhoto: (photo) => dispatch(changeUserPhoto(photo)),
  getTemplateFromStorage: (templateId) => dispatch(getTemplateFromStorage(templateId))
})

export default connect(mapStateToProps,mapDispatchToProps)(PhotoBlog);

