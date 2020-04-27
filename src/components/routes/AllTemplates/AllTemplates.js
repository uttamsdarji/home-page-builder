import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import './AllTemplates.scss';

class AllTemplates extends React.Component {
  render() {
    let {allTemplates} = this.props;
    return (
      <div className="allTemplates-wrapper">
        <div className="allTemplates-container">
          <div className="allTemplates-titile">Select any template to edit</div>
          <div className="templates-list-container row">
            {allTemplates && allTemplates.templates && allTemplates.templates.length > 0 &&
              allTemplates.templates.map((template,index) => {
                return (
                  <div className="col-12 col-md-12 col-lg-4" key={index}>
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

export default withRouter(connect(mapStateToProps)(AllTemplates));