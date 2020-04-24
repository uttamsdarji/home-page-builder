import {connect} from 'react-redux';
import EditTextField from './EditTextField';
import {editTextField} from './editTextFieldModule';

const mapDispatchToProps = (dispatch) => ({
  editTextField: (templateId,fieldKey,fieldValue) => dispatch(editTextField(templateId,fieldKey,fieldValue))
})

export default connect(null,mapDispatchToProps)(EditTextField)