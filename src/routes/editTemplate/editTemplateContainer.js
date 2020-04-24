import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import EditTemplate from './EditTemplate';

const mapStateToProps = (state) => ({
  allTemplates: state.allTemplates
})

export default withRouter(connect(mapStateToProps)(EditTemplate));