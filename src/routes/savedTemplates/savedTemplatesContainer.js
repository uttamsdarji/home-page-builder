import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import SavedTemplates from './SavedTemplates';

const mapStateToProps = (state) => ({
  allTemplates: state.allTemplates
})

export default withRouter(connect(mapStateToProps)(SavedTemplates));