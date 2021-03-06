import React from 'react';
import EditTextField from '../../EditTextField/EditTextField';
import {getHTMLHeader} from '../../../store/actions/templateActions/commonTemplateActions';
import './PhotoBlog.scss';
import './PhotoBlogTemplate.css';
import {connect} from 'react-redux';
import {OverlayTrigger,Tooltip} from 'react-bootstrap';
import Loader from '../../Loader';
import SaveModal from '../../SaveModal/SaveModal';
import {changeCoverPhoto, removeDefaultPhotos, addPhoto, changeUserPhoto, convertImagestoBase64, downloadTemplate, deletePhoto} from '../../../store/actions/templateActions/photoBlogActions';
import {undoTemplate, redoTemplate, getTemplateFromDb, resetTemplate, saveTemplate, previewTemplate} from '../../../store/actions/templateActions/commonTemplateActions';

const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve({image: reader.result, file});
  reader.onerror = error => reject(error);
});

async function getBase64(file,cb,index) {
  cb(await toBase64(file),index);
}

class PhotoBlog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textEditorOpen: false,
      textEditorProps: {},
      saveModalOpen: false,
      editPhotoIndex: null
    }
  }
  componentDidMount() {
    this.props.getTemplateFromDb('photoBlog');
    this.props.convertImagestoBase64();
  }
  componentDidUpdate(prevProps) {
    if(prevProps.templateEdited && !this.props.templateEdited) {
      this.props.convertImagestoBase64();
    }
  }
  toggleTextEditor = (e,fieldKey,fieldValue,fieldTitle,textArea) => {
    if(e) {
      e.preventDefault();
    }
    let textEditorProps = {};
    if(fieldKey && fieldValue) {
      textEditorProps = {
        templateId: this.props.data.id,
        fieldKey,
        fieldValue,
        fieldTitle,
        textArea
      }
    }
    this.setState({
      textEditorOpen: !this.state.textEditorOpen,
      textEditorProps
    })
  }
  toggleSaveModal = () => {
    this.setState({
      saveModalOpen: !this.state.saveModalOpen
    })
  }
  preventDefault = (e) => {
    // e.preventDefault();
  }
  onCoverUpload = (e) => {
    let coverPhoto = e.target.files && e.target.files[0];
    if(coverPhoto) {
      getBase64(coverPhoto,this.props.changeCoverPhoto)
    }
  }
  onUserPhotoUpload = (e) => {
    let coverPhoto = e.target.files && e.target.files[0];
    if(coverPhoto) {
      getBase64(coverPhoto,this.props.changeUserPhoto)
    }
  }
  onPhotosUpload = (e) => {
    let photos = e.target.files;
    if(photos && photos.length > 0) {
      this.props.removeDefaultPhotos();
      setTimeout(() => {
        Object.keys(photos).forEach((key) => {
          getBase64(photos[key],this.props.addPhoto)
        })
      },300)
    }
  }
  onPhotoEdit = (e) => {
    let photo = e.target.files && e.target.files[0];
    let index = this.state.editPhotoIndex;
    if(photo && index > -1) {
      getBase64(photo,this.props.addPhoto,index)
    }
  }
  onMorePhotosUpload = (e) => {
    let photos = e.target.files;
    if(photos && photos.length > 0) {
      Object.keys(photos).forEach((key) => {
        getBase64(photos[key],this.props.addPhoto)
      })
    }
  }
  downloadTemplate = () => {
    this.props.downloadTemplate()
  }
  componentWillUnmount() {
    this.props.previewTemplate('photoBlog',false)
  }
  editPhoto = (e,index) => {
    e.preventDefault();
    this.setState({
      editPhotoIndex: index
    },() => {
      let inputElement = document.querySelector('#editPhoto');
      if(inputElement) {
        inputElement.click();
      }
    })
  }
  render() {
    let {data} = this.props;
    return (
      <div className="photo-blog-template">
        <Loader loading={this.props.loading || this.props.downloadLoading} className={this.props.downloadLoading ? 'downloadLoader' : ''} loadingText={this.props.downloadLoading ? 'Downloading' : ''}></Loader>
        <div className={`template-preview ${this.props.templatePreview ? 'preview' : ''}`} ref={(container) => {this.templateContainer = container}}>
            <nav className="navbar navbar-expand-lg">
              <a className="navbar-brand" href="#" onClick={(e) => {this.toggleTextEditor(e,'navBrand',data.textFields.navBrand,'Website Title')}}>{data.textFields.navBrand}</a>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
              </button>

              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item active">
                    <a className="nav-link" href="#home" onClick={this.preventDefault}>Home <span className="sr-only">(current)</span></a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#photos" onClick={this.preventDefault}>Photos</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#bio" onClick={this.preventDefault}>Biography</a>
                  </li>
                </ul>
              </div>
            </nav>
            <main className="main-content">
              <section className="site-section-hero bg-image" style={{backgroundImage: `url(${data.photos.coverImage.fileUrl || data.photos.coverImage.image})`, backgroundPosition: `50% 0px`}} id="home">
                <div className="row justify-content-center align-items-center">
                  <div className="col-md-7 text-center">
                    <h1 className="text-white heading text-uppercase" onClick={(e) => {this.toggleTextEditor(e,'welcomeTitle',data.textFields.welcomeTitle)}}>
                      {data.textFields.welcomeTitle}
                    </h1>
                    <p className="lead text-white mb-5" onClick={(e) => {this.toggleTextEditor(e,'welcomeText',data.textFields.welcomeText,null,true)}}>
                      {data.textFields.welcomeText}
                    </p>
                  </div>
                </div>
              </section>
              <div className="container-fluid">
                <section className="row align-items-stretch photos" id="photos">
                  <div className="col-12">
                    <div className="row align-items-stretch">
                      {data.photos && data.photos.otherPhotos && data.photos.otherPhotos.length > 0 &&
                        data.photos.otherPhotos.map((photo,index) => {
                          return (
                            <div className="col-6 col-md-6 col-lg-4 photo-container" key={index}>
                              {!this.props.downloadLoading &&
                                <OverlayTrigger placement={'left'} overlay={<Tooltip>Delete Photo</Tooltip>}>
                                  <div className="delete-image-icon" onClick={() => this.props.deletePhoto(index)}><i className="fas fa-trash-alt"></i></div>
                                </OverlayTrigger>
                              }
                              <a href={photo.fileUrl || photo.image} target="_blank" className="d-block photo-item" onClick={(e) => this.editPhoto(e,index)}>
                                <img src={photo.fileUrl || photo.image} alt="Image" className="img-fluid" />
                              </a>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </section>
                <section className="site-section darken-bg row" id="bio">
                  <div className="container">
                    <div className="row justify-content-center">
                      <div className="col-md-8">
                      <h2 className="heading text-uppercase text-white">Biography</h2>
                      <figure className="mb-5" ><img src={data.photos.userImage.fileUrl || data.photos.userImage.image} alt="Image" className="img-fluid w-50 rounded" /></figure>
                      <div className="aos-init">
                        <h2 className="text-white" onClick={(e) => {this.toggleTextEditor(e,'bioTitle',data.textFields.bioTitle,'User Name')}}>{data.textFields.bioTitle}</h2>
                        <p onClick={(e) => {this.toggleTextEditor(e,'bioDetails',data.textFields.bioDetails,'User Details',true)}}>{data.textFields.bioDetails}</p>
                      </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </main>
        </div>
        {!this.props.templatePreview &&
        <div className="template-edit-container">
          <div className={`mask ${this.props.loading || this.props.downloadLoading ? 'show' : ''}`}></div>
          <div className="template-edit-title">Photo Blog 
            <OverlayTrigger placement={'right'} overlay={<Tooltip>Download Template</Tooltip>}>
              <span className="downlaod-btn" onClick={this.downloadTemplate}><i className="fas fa-download"></i></span>
            </OverlayTrigger>
            <span className="template-reset-btn" onClick={() => this.props.resetTemplate('photoBlog')}>Reset</span>
          </div>
          <div className="save-btn" onClick={this.toggleSaveModal}>
            Save Template <i className="fas fa-download"></i>
          </div>
          <div className="preview-tempalte" onClick={() => this.props.previewTemplate('photoBlog',true)}>Preview</div>
          <SaveModal show={this.state.saveModalOpen} onHide={this.toggleSaveModal} onSave={() => this.props.saveTemplate('photoBlog')}/>
          <div className="undo-btns">
            <span onClick={() => this.props.undoTemplate('photoBlog')} className={`undo ${this.props.prevData && this.props.prevData.length > 0 ? '' : 'disabled'}`}>
              <i className="fas fa-undo"></i>
              <div className="undo-text">Undo</div>
            </span>
            <span onClick={() => this.props.redoTemplate('photoBlog')} className={`redo ${this.props.nextData && this.props.nextData.length > 0 ? '' : 'disabled'}`}>
              <i className="fas fa-redo"></i>
              <div className="undo-text">Redo</div>
            </span>
          </div>
          <div className="upload-section">
            <div className="cover-upload">
              <span className="cover-label">Change Cover Photo<label htmlFor="coverPhoto">Select Photo</label></span>
              <input id="coverPhoto" type='file' multiple={false} onChange={this.onCoverUpload} accept=".png,.jpeg,.jpg" style={{display: 'none'}}/>
            </div>
          </div>
          <div className="upload-section">
            <div className="cover-upload">
              <span className="cover-label">Change Photos<label htmlFor="allPhotos">Upload Photos</label></span>
              <input id="allPhotos" type='file' multiple={true} onChange={this.onPhotosUpload} accept=".png,.jpeg,.jpg" style={{display: 'none'}}/>
            </div>
          </div>
          <div className="upload-section">
            <div className="cover-upload">
              <span className="cover-label">Add More Photos<label htmlFor="morePhotos">Add Photos</label></span>
              <input id="morePhotos" type='file' multiple={true} onChange={this.onMorePhotosUpload} accept=".png,.jpeg,.jpg" style={{display: 'none'}}/>
            </div>
          </div>
          <div className="upload-section">
            <div className="cover-upload">
              <span className="cover-label">Change Bio Photo<label htmlFor="userPhoto">Choose Photo</label></span>
              <input id="userPhoto" type='file' multiple={false} onChange={this.onUserPhotoUpload} accept=".png,.jpeg,.jpg" style={{display: 'none'}}/>
            </div>
          </div>
          <div className="upload-section" style={{display: 'none'}}>
            <div className="cover-upload">
              <span className="cover-label">Edit Photo<label htmlFor="editPhoto">Choose Photo</label></span>
              <input id="editPhoto" type='file' multiple={false} onChange={this.onPhotoEdit} accept=".png,.jpeg,.jpg" style={{display: 'none'}}/>
            </div>
          </div>
        </div>
        }
        {this.props.templatePreview &&
          <OverlayTrigger placement="left" overlay={<Tooltip>Back to edit template</Tooltip>}>
            <div className="remove-preview-template" onClick={() => this.props.previewTemplate('photoBlog',false)}>Back</div>
          </OverlayTrigger>
        }
        {this.state.textEditorOpen &&
          <EditTextField show={this.state.textEditorOpen} onHide={this.toggleTextEditor} {...this.state.textEditorProps} container={this.templateContainer} />
        }
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  data: state.photoBlog.data,
  prevData: state.photoBlog.prevState,
  nextData: state.photoBlog.nextState,
  templateEdited: state.photoBlog.templateEdited,
  loading: state.editTemplate.loading,
  downloadLoading: state.photoBlog.downloadLoading,
  templatePreview: state.photoBlog.templatePreview
})

const mapDispatchToProps = (dispatch)  => ({
  undoTemplate: (templateId) => dispatch(undoTemplate(templateId)),
  redoTemplate: (templateId) => dispatch(redoTemplate(templateId)),
  changeCoverPhoto: (photo) => dispatch(changeCoverPhoto(photo)),
  resetTemplate: (templateId) => dispatch(resetTemplate(templateId)),
  removeDefaultPhotos: () => dispatch(removeDefaultPhotos()),
  addPhoto: (photo,index) => dispatch(addPhoto(photo,index)),
  changeUserPhoto: (photo) => dispatch(changeUserPhoto(photo)),
  getTemplateFromDb: (templateId) => dispatch(getTemplateFromDb(templateId)),
  convertImagestoBase64: () => dispatch(convertImagestoBase64()),
  saveTemplate: (templateId) => dispatch(saveTemplate(templateId)),
  downloadTemplate: () => dispatch(downloadTemplate()),
  previewTemplate: (templateId,flag) => dispatch(previewTemplate(templateId,flag)),
  deletePhoto: (index) => dispatch(deletePhoto(index))
})

export default connect(mapStateToProps,mapDispatchToProps)(PhotoBlog);