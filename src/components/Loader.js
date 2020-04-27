import React from 'react';
import loader from '../assets/loader.gif';

export default class Loader extends React.Component {
  render() {
    let {loading} = this.props;
    return (
      <React.Fragment>
        {this.props.loading ?
          <div className="loading-container">
            <img src={loader} className="loader"/>
          </div>
          :
          this.props.children
        }
      </React.Fragment>
    )
  }
}