import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../../store/actions/authActions';
import './Login.scss';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }
  login = (e) => {
    e.preventDefault();
    let url = this.props.location.pathname.indexOf('login') > -1 ? '/websiteBuilder' : this.props.location.pathname;
    let cb = () => {
      this.props.history.push(url)
    };
    this.props.login(this.state.email,this.state.password,cb);
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
      let url = this.props.location.pathname.indexOf('login') > -1 ? '/websiteBuilder' : this.props.location.pathname;
      this.props.history.push(url);
    }
  }
  componentDidUpdate() {
    let isAuthenticated = this.props.user && this.props.user.uid;
    if(isAuthenticated) {
      let url = this.props.location.pathname.indexOf('login') > -1 ? '/websiteBuilder' : this.props.location.pathname;
      this.props.history.push(url);
    }
  }
  onSignupClick = () => {
    this.props.history.push('/websiteBuilder/signup')
  }
  render() {
    let passwordError = this.props.loginError && (this.props.loginError.code == "auth/wrong-password") && "*Incorrect Password";
    let emailError = this.props.loginError && (this.props.loginError.code == "auth/user-not-found") && "*Email doesn't exist";
    return (
      <div className = "login-layout row">
        <div className="login-container col-10 col-sm-8 col-md-6 col-lg-4 mx-auto">
          <div className="login-title">Login</div>
          <div className="login-form-container">
          <form className="form-signin" onSubmit={this.login}>
              <div className="form-label-group">
                <label htmlFor="inputEmail">Email<span className="red-star">*</span></label>
                {!!emailError && 
                  <span className="login-error">{emailError}</span>
                }
                <input type="text" id="inputEmail" name="email" className="form-control" placeholder="Email address" required autoFocus onChange={this.onInputChange}/>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputPassword">Password<span className="red-star">*</span></label>
                {!!passwordError && 
                  <span className="login-error">{passwordError}</span>
                }
                <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required  onChange={this.onInputChange}/>
              </div>
              <div className="btn-container">
                <button className="signin-btn" onClick={this.login} type="submit">Sign In</button>
                <button className="signin-btn" onClick={this.onSignupClick}>Sign Up</button>
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
  loginError: state.auth.loginError
})

const mapDispatchoProps = (dispatch) => ({
  login: (email,password,cb) => dispatch(login(email,password,cb))
})

export default withRouter(connect(mapStateToProps,mapDispatchoProps)(Login));