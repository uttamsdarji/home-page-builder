import React from 'react';
import {Link} from 'react-router-dom';
import './SavedTemplates.scss';
import '../allTemplates/AllTemplates.scss';
import '../editTemplate/EditTemplate.scss';

export default class SavedTemplates extends React.Component {
  onBtnClick = () => {
    this.props.history.push('/websiteBuilder')
  }
  render() {
    let {allTemplates} = this.props;
    let templates = [];
    if(allTemplates && allTemplates.templates && allTemplates.templates.length > 0) {
      allTemplates.templates.forEach((template) => {
        let storedTemplate = localStorage.getItem(template.id);
        if(storedTemplate) {
          templates.push(template)
        }
      })
    }
    return (
      <div className="allTemplates-wrapper">
        <div className="allTemplates-container">
          <div className="allTemplates-titile">Saved templates</div>
          <div className="templates-list-container">
            {templates && templates.length > 0 ?
              templates.map((template,index) => {
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
              :
              <div className="select-template-container">
                <div className="select-template-title">
                  No Saved Templates<br />
                  Select a template to edit
                </div>
                <div className="select-template-btn" onClick={this.onBtnClick}>
                  All Templates
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    )
  }
}


