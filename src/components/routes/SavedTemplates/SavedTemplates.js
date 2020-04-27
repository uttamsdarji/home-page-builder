import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {OverlayTrigger, Tooltip} from 'react-bootstrap';
import {getSavedTemplatesId,deleteTemplateFromDb} from '../../../store/actions/templateActions/commonTemplateActions';
import Loader from '../../Loader';
import DeleteTemplateModal from '../../SaveModal/SaveModal';
import './SavedTemplates.scss';
import '../AllTemplates/AllTemplates.scss';
import '../EditTemplate/EditTemplate.scss';

class SavedTemplates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteModalOpen: false,
      deleteTemplateId: null
    }
  }
  onBtnClick = () => {
    this.props.history.push('/websiteBuilder')
  }
  componentDidMount() {
    this.props.getSavedTemplatesId();
  }
  toggleDeleteModal = (templateId) => {
    this.setState({
      deleteModalOpen: !this.state.deleteModalOpen,
      deleteTemplateId: templateId ? templateId : null
    })
  }
  onDelete = () => {
    this.props.deleteTemplateFromDb(this.state.deleteTemplateId);
  }
  render() {
    let {allTemplates,savedTemplateIds} = this.props;
    let templates = [];
    if(allTemplates && allTemplates.templates && allTemplates.templates.length > 0 && savedTemplateIds && savedTemplateIds.length > 0) {
      allTemplates.templates.forEach((template) => {
        if(savedTemplateIds.indexOf(template.id) > -1) {
          templates.push(template)
        }
      })
    }
    return (
      <Loader loading={this.props.loading}>
        <div className="allTemplates-wrapper">
          <div className="allTemplates-container">
            <div className="allTemplates-titile">Saved templates</div>
            <div className="templates-list-container row">
              {templates && templates.length > 0 ?
                templates.map((template,index) => {
                  return (
                    <div className="col-12 col-md-12 col-lg-4 saved-template-card" key={index}>
                      <OverlayTrigger placement={'left'} overlay={<Tooltip>Delete Template</Tooltip>}>
                        <div className="delete-template-icon" onClick={() => this.toggleDeleteModal(template.id)}><i className="fas fa-trash-alt"></i></div>
                      </OverlayTrigger>
                      <Link className="template-container" to={`/websiteBuilder/editTemplate/${template.id}`}>
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
            <DeleteTemplateModal show={this.state.deleteModalOpen} onHide={this.toggleDeleteModal} onSave={this.onDelete} deleteModal={true}/>
          </div>
        </div>
      </Loader>
    )
  }
}

const mapStateToProps = (state) => ({
  allTemplates: state.allTemplates,
  loading: state.savedTemplates.loading,
  savedTemplateIds: state.savedTemplates.savedTemplateIds
})

const mapDispatchToProps = (dispatch) => ({
  getSavedTemplatesId: () => dispatch(getSavedTemplatesId()),
  deleteTemplateFromDb: (templateId) => dispatch(deleteTemplateFromDb(templateId))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(SavedTemplates));