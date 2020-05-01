import React from 'react';
import loader from '../assets/loader.gif';

export default class Loader extends React.Component {
  render() {
    let {loading} = this.props;
    return (
      <React.Fragment>
        {this.props.loading ?
          <div className={`loading-container ${this.props.className ? this.props.className : ''}`}>
            <img src={loader} className="loader"/>
            {this.props.loadingText &&
              <div className="loading-text">{this.props.loadingText}</div>
            }
          </div>
          :
          this.props.children
        }
      </React.Fragment>
    )
  }
}