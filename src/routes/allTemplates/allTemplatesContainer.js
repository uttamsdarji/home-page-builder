import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import AllTemplates from './AllTemplates';

const mapStateToProps = (state) => ({
  allTemplates: state.allTemplates
})

export default withRouter(connect(mapStateToProps)(AllTemplates));