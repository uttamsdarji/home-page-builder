import React from 'react';
import {Link} from 'react-router-dom';
import './AllTemplates.scss';

export default class AllTemplates extends React.Component {
  render() {
    let {allTemplates} = this.props;
    return (
      <div className="allTemplates-wrapper">
        <div className="allTemplates-container">
          <div className="allTemplates-titile">Select any template to edit</div>
          <div className="templates-list-container">
            {allTemplates && allTemplates.templates && allTemplates.templates.length > 0 &&
              allTemplates.templates.map((template,index) => {
                return (
                  <Link className="template-container" key={index} to={`/websiteBuilder/editTemplate/${template.id}`}>
                    <div className="template-thumbnail">
                      <img src={template.thumbnail} alt={template.name} />
                    </div>
                    <div className="template-title">
                      {template.name}
                    </div>
                    <div className="template-description">
                      {template.description}
                    </div>
                  </Link>
                )
              })
            }
          </div>
        </div>
      </div>
    )
  }
}


