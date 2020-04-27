import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import './EditTemplate.scss';

class EditTemplate extends React.Component {
  componentDidMount() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.add('overflow-hidden')
  }
  componentWillUnmount() {
    let body = document.getElementsByTagName('body')[0];
    body.classList.remove('overflow-hidden')
  }
  render() {
    let templateId = this.props.match && this.props.match.params && this.props.match.params.templateId;
    let allTemplates = templateId && this.props.allTemplates && this.props.allTemplates.templates;
    let template = allTemplates && allTemplates.length > 0 && allTemplates.filter((t) => {
      return t.id == templateId
    });
    template = template && template[0];
    let component = templateId ? <template.component /> : <SelectTemplate history={this.props.history}/>
    return(
      <div className="edit-template-wrapper">
        <div className="edit-template-container">
          {component}
        </div>
      </div>
    )
  }
}

class SelectTemplate extends React.Component {
  onBtnClick = () => {
    this.props.history.push('/websiteBuilder')
  }
  render() {
    return (
      <div className="select-template-container">
        <div className="select-template-title">
          Select a template to edit
        </div>
        <div className="select-template-btn" onClick={this.onBtnClick}>
          All Templates
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  allTemplates: state.allTemplates
})

export default withRouter(connect(mapStateToProps)(EditTemplate));
