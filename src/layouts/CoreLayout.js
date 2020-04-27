import React from 'react';
import Header from './HeaderLayout';
import './CoreLayout.scss';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {authListener} from '../store/actions/authActions';
import Loader from '../components/Loader';
import Login from '../components/routes/Login/Login';
import Signup from '../components/routes/Signup/Signup';
import AllTemplates from '../components/routes/AllTemplates/AllTemplates';
import SavedTemplates from '../components/routes/SavedTemplates/SavedTemplates';
import EditTemplate from '../components/routes/EditTemplate/EditTemplate';
import PageNotFound from './PageNotFound';

class CoreLayout extends React.Component {
  componentDidMount() {
    this.props.authListener()
    if(!this.props.location.pathname || this.props.location.pathname == '/') {
      this.props.history.push('/websiteBuilder')
    }
  }
  render() {
    let isAuthenticated = this.props.user && this.props.user.uid;
    return (
      <Router>
        <div className="page-container">
          <Header />
          <Loader loading={this.props.loading}>
            {isAuthenticated ?
              <Switch>
                <Route exact path="/" component={AllTemplates} />
                <Route exact path="/websiteBuilder" component={AllTemplates} />
                <Route exact path="/websiteBuilder/savedTemplates" component={SavedTemplates} />
                <Route exact path="/websiteBuilder/editTemplate/:templateId?" component={EditTemplate} />
                <Route exact path="/websiteBuilder/login" component={Login} />
                <Route exact path="/websiteBuilder/signup" component={Signup} />
                <Route component={PageNotFound} />
              </Switch>
              :
              <Switch>
                <Route exact path="/websiteBuilder/signup" component={Signup} />
                <Route exact path="/websiteBuilder/login" component={Login} />
                <Route component={Login} />
              </Switch>
            }
          </Loader>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.firebase.auth,
  loading: state.basicData.loading
})

const mapDispatchToProps = (dispatch) => ({
  authListener: () => dispatch(authListener())
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(CoreLayout));