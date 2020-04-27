import React from 'react';
import {Modal} from 'react-bootstrap';
import './SaveModal.scss';

class SaveModal extends React.Component {
  onSave = () => {
    this.props.onSave();
    this.props.onHide();
  }
  render() {
    let {show,onHide,container} = this.props;
    let titleText = this.props.deleteModal ? 'Delete Template' : 'Save template to edit later';
    let cautionText = this.props.deleteModal ? 'This action can not be reverted.' : "Images won't be saved, you will have to upload the images again."
    let submitText = this.props.deleteModal ? 'Delete' : 'Save'
    return (
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="save-template-modal"
      >
        <Modal.Body>
            <div className="textfield-title">
              {titleText}
              <div className="image-caution">
                <i className="fas fa-exclamation-triangle"></i> {cautionText}
              </div>
            </div>
            <div className="textfield-action-btns">
              <span className={`submit-btn`} onClick={this.onSave}>{submitText}</span>
              <span className={`cancel-btn`} onClick={onHide}>Cancel</span>
            </div>
        </Modal.Body>
      </Modal>
    )
  }
}

export default SaveModal;