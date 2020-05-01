import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {signup} from '../../../store/actions/authActions';
import '../Login/Login.scss';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
    }
  }
  signup = (e) => {
    e.preventDefault();
    if(this.state.email && this.state.password && this.state.firstName && this.state.lastName) {
      let data = {
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      }
      let cb = () => this.props.history.push('/websiteBuilder');
      this.props.signup(data,cb);
    }
  }
  onInputChange = (e) => {
    let value = e.target.value;
    let field = e.target.name;
    this.setState({
      [field]: value
    })
  }
  componentDidMount() {
    let isAuthenticated = this.props.user && this.props.user.uid;
    if(isAuthenticated) {
      this.props.history.push('/websiteBuilder');
    }
  }
  componentDidUpdate() {
    let isAuthenticated = this.props.user && this.props.user.uid;
    if(isAuthenticated) {
      this.props.history.push('/websiteBuilder');
    }
  }
  onLoginClick = () => {
    this.props.history.push('/websiteBuilder/login')
  }
  render() {
    return (
      <div className = "login-layout row">
        <div className="login-container col-10 col-sm-8 col-md-6 col-lg-4 mx-auto">
          <div className="login-title">Signup</div>
          <div className="login-form-container">
          <form className="form-signin">
              <div className="form-label-group">
                <label htmlFor="firstName">First Name<span className="red-star">*</span></label>
                <input type="text" id="firstName" name="firstName" className="form-control" placeholder="First Name" required autoFocus onChange={this.onInputChange}/>
              </div>
              <div className="form-label-group">
                <label htmlFor="lastName">Last Name<span className="red-star">*</span></label>
                <input type="text" id="lastName" name="lastName" className="form-control" placeholder="Last Name" required autoFocus onChange={this.onInputChange}/>
              </div>
              <div className="form-label-group">
                <label htmlFor="inputEmail">Email<span className="red-star">*</span></label>
                <input type="text" id="inputEmail" name="email" className="form-control" placeholder="Email address" required autoFocus onChange={this.onInputChange}/>
              </div>
              <div className="form-label-group">
                <label htmlFor="inputPassword">Password<span className="red-star">*</span></label>
                <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required  onChange={this.onInputChange}/>
              </div>
              {this.props.signupError &&
                <div className="login-error">*{this.props.signupError}</div>
              }
              <div className="btn-container">
                <span className="signin-btn" onClick={this.signup}>Sign Up</span>
                <span className="signin-btn" onClick={this.onLoginClick}>Back to Login</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  user: state.firebase.auth,
  signupError: state.auth.signupError
})

const mapDispatchoProps = (dispatch) => ({
  signup: (data,cb) => dispatch(signup(data,cb))
})

export default withRouter(connect(mapStateToProps,mapDispatchoProps)(Signup));