import React from 'react';
import Logo from '../assets/websiteLogo.png'
import {withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../store/actions/authActions';
import './HeaderLayout.scss';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeMenu: this.getActiveMenu()
    }
  }
  getActiveMenu = () => {
    let activeMenu = 'allTemplates';
    if(this.props.location && this.props.location.pathname) {
      if(this.props.location.pathname.indexOf('websiteBuilder/editTemplate') > -1) {
        activeMenu = 'editTemplate'
      } else if(this.props.location.pathname.indexOf('websiteBuilder/savedTemplates') > -1) {
        activeMenu = 'savedTemplates'
      } else if(this.props.location.pathname.indexOf('websiteBuilder') > -1) {
        activeMenu = 'allTemplates'
      }
    }
    return activeMenu
  }
  componentDidMount() {
    this.setState({
      activeMenu: this.getActiveMenu()
    })
  }

  componentDidUpdate(prevProps) {
    if(prevProps.location.pathname != this.props.location.pathname) {
      this.setState({
        activeMenu: this.getActiveMenu()
      })
    }
  }
  logout = () => {
    let cb = () => this.props.history.push(`/websiteBuilder/login`)
    this.props.logout(cb);
  }
  render() {
    let isAuthenticated = this.props.user && this.props.user.uid;
    return (
      <div className="header-container">
        
        <nav className="navbar navbar-expand-lg">
          <Link className="navbar-brand logo-container" to={'/websiteBuilder'}>
            <img src={Logo} alt="Website Builder" className="logo-img"/>
          </Link>
          {isAuthenticated &&
            <React.Fragment>
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mainHeader" aria-controls="mainHeader" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"><i className="fas fa-bars"></i></span>
              </button>

              <div className="collapse navbar-collapse nav-menu" id="mainHeader">
                <ul className="navbar-nav mr-auto nav-menu-list">
                  <li className={`nav-item ${this.state.activeMenu == 'allTemplates' ? 'active' : ''}`}>
                    <Link className="nav-link" to={'/websiteBuilder'}>All Templates</Link>
                  </li>
                  <li className={`nav-item ${this.state.activeMenu == 'savedTemplates' ? 'active' : ''}`}>
                    <Link className="nav-link" to={'/websiteBuilder/savedTemplates'}>Saved Templates</Link>
                  </li>
                  <li className={`nav-item ${this.state.activeMenu == 'editTemplate' ? 'active' : ''}`}>
                    <Link className="nav-link" to={'/websiteBuilder/editTemplate'}>Edit Template</Link>
                  </li>
                </ul>
                <div onClick={this.logout} className="logout-btn">Logout</div>
              </div>
            </React.Fragment>
          }
        </nav>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.firebase.auth,
  loading: state.basicData.loading
})

const mapDispatchToProps = (dispatch) => ({
  logout: (cb) => dispatch(logout(cb))
})

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Header))