import React from 'react';
import Logo from '../assets/websiteLogo.png'
import {withRouter} from 'react-router-dom';
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
  onMenuClick = (link) => {
    this.props.history.push(`/websiteBuilder/${link}`);
  }
  render() {
    return (
      <div className="header-container">
        <div className="logo-container">
          <img src={Logo} alt="Website Builder" />
        </div>
        <div className="nav-menu">
          <ul className="nav-menu-list">
            <li className={`nav-item ${this.state.activeMenu == 'allTemplates' ? 'active' : ''}`} onClick={() => {this.onMenuClick('')}}>All Templates</li>
            <li className={`nav-item ${this.state.activeMenu == 'savedTemplates' ? 'active' : ''}`} onClick={() => {this.onMenuClick('savedTemplates')}}>Saved Templates</li>
            <li className={`nav-item ${this.state.activeMenu == 'editTemplate' ? 'active' : ''}`} onClick={() => {this.onMenuClick('editTemplate')}}>Edit Template</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)