import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './SavedTemplates.scss';
import '../AllTemplates/AllTemplates.scss';
import '../EditTemplate/EditTemplate.scss';

class SavedTemplates extends React.Component {
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
          <div className="templates-list-container row">
            {templates && templates.length > 0 ?
              templates.map((template,index) => {
                return (
                  <div className="col-12 col-md-12 col-lg-4">
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
                  </div>
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

const mapStateToProps = (state) => ({
  allTemplates: state.allTemplates
})

export default withRouter(connect(mapStateToProps)(SavedTemplates));