import {Component} from 'react'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: ''}

  onUserInput = event => {
    this.setState({username: event.target.value})
  }

  onPasswordInput = event => {
    this.setState({password: event.target.value})
  }

  onFormSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
  }

  renderLoginForm = () => (
    <form className="form-container" onSubmit={this.onFormSubmit}>
      <h1 className="login-heading">Login</h1>
      <label className="username-label" htmlFor="usernameId">
        USERNAME
      </label>
      <input
        type="text"
        placeholder="Username"
        id="usernameId"
        className="user-input-element"
        onChange={this.onUserInput}
      />
      <br />
      <label className="password-label" htmlFor="passwordId">
        PASSWORD
      </label>
      <input
        type="password"
        placeholder="Password"
        id="passwordId"
        className="password-input-element"
        onChange={this.onPasswordInput}
      />
      <button className="login-btn" type="submit">
        Login
      </button>
    </form>
  )

  render() {
    return (
      <div className="login-page-bg-container">
        <div className="login-movie-logo-container">
          <img
            src="https://res.cloudinary.com/dl88cshny/image/upload/v1679388794/Group_7399_ycynfv.png"
            alt="login website logo"
            className="movie-logo-login-img"
          />
        </div>
        {this.renderLoginForm()}
      </div>
    )
  }
}

export default LoginPage
