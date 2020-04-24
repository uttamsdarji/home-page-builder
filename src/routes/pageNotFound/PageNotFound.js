import React from 'react';
import {withRouter} from 'react-router-dom';
import './PageNotFound.scss';

class PageNoteFound extends React.Component {
  render() {
    return (
      <div className="page-not-found-wrapper">
        <div className="page-not-found-container">
          <div className="pagenotfound_image">
          </div>
          <div className="not-found-text">
            Whoops!<br />
            404<br />
            PAGE NOT FOUND
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(PageNoteFound)