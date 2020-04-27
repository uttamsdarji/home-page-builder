import React from 'react';
import {Modal} from 'react-bootstrap';
import {connect} from 'react-redux';
import {editTextField} from '../../store/actions/templateActions/commonTemplateActions';
import './EditTextField.scss';

class EditTextField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: props.fieldValue || ''
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.fieldValue != prevProps.fieldValue) {
      this.setState({
        inputValue: this.props.fieldValue
      })
    }
  }
  onTextChange = (e) => {
    let value = e && e.target && e.target.value;
    if(value || value == '') {
      this.setState({
        inputValue: value
      })
    }
  }
  onSave = () => {
    let {onHide,fieldKey,templateId} = this.props;
    this.props.editTextField(templateId,fieldKey,this.state.inputValue);
    onHide();
  }
  render() {
    let {show,onHide,fieldKey,fieldTitle,fieldValue,templateId,container,textArea} = this.props;
    let btnDisabled = this.props.fieldValue == this.state.inputValue;
    return(
      <Modal
        show={show}
        onHide={onHide}
        dialogClassName="text-edit-modal"
        container={container}
      >
      <Modal.Body>
        {fieldTitle &&
          <div className="textfield-title">{fieldTitle}</div>
        }
        <div className={`textfiled-input-container ${textArea ? 'textArea' : ''}`}>
          {textArea ? 
            <textarea value={this.state.inputValue} placeholder="Enter Text" onChange={this.onTextChange} />
            :
            <input value={this.state.inputValue} placeholder="Enter Text" onChange={this.onTextChange}/>
          }
        </div>
        <div className="textfield-action-btns">
          <span className={`submit-btn ${btnDisabled ? 'disabled' : ''}`} onClick={this.onSave}>Save</span>
          <span className={`cancel-btn`} onClick={onHide}>Cancel</span>
        </div>
      </Modal.Body>
      </Modal>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  editTextField: (templateId,fieldKey,fieldValue) => dispatch(editTextField(templateId,fieldKey,fieldValue))
})

export default connect(null,mapDispatchToProps)(EditTextField)