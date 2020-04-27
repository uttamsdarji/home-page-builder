import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CoreLayout from './layouts/CoreLayout';

import './App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" component={CoreLayout} />
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
