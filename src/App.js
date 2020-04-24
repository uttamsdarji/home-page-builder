import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import CoreLayout from './layouts/CoreLayout';

import './App.scss';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <div className="App">
            <Switch>
              <Route path="/" component={CoreLayout} />
              <Route path="/websiteBuilder" component={CoreLayout} />
            </Switch>
          </div>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
