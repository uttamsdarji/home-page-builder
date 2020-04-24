import React from 'react';
import Header from './HeaderLayout';
import './CoreLayout.scss';
import {BrowserRouter as Router, Route, Switch, withRouter} from 'react-router-dom';
import AllTemplates from '../routes/allTemplates/allTemplatesContainer';
import SavedTemplates from '../routes/savedTemplates/savedTemplatesContainer';
import EditTemplate from '../routes/editTemplate/editTemplateContainer';
import PageNotFound from '../routes/pageNotFound/PageNotFound';

class CoreLayout extends React.Component {
  componentDidMount() {
    if(!this.props.location.pathname || this.props.location.pathname == '/') {
      this.props.history.push('/websiteBuilder')
    }
  }
  render() {
    return (
      <Router>
        <div className="page-container">
          <Header />
          <Switch>
            <Route exact path="/" component={AllTemplates} />
            <Route exact path="/websiteBuilder" component={AllTemplates} />
            <Route exact path="/websiteBuilder/savedTemplates" component={SavedTemplates} />
            <Route exact path="/websiteBuilder/editTemplate/:templateId?" component={EditTemplate} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default withRouter(CoreLayout);