import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'
import FooterSection from '../FooterSection'

class Account extends Component {
  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const username = localStorage.getItem('username')
    const user = JSON.parse(username)
    const password = localStorage.getItem('password')
    const pass = JSON.parse(password)
    const stars = '*'.repeat(pass.length)

    return (
      <>
        <Header />
        <div className="account-bg-container">
          <div className="account-container">
            <h1 className="account-heading">Account</h1>
            <hr className="horizontal-line-1" />
            <div className="membership-container">
              <p className="membership-para">Member ship</p>
              <div className="username-container">
                <p className="username-para">{user}@gmail.com</p>
                <p className="password-para">Password:{stars}</p>
              </div>
            </div>
            <hr className="horizontal-line-2" />
            <div className="plans-details-container">
              <p className="plans-para">Plan details</p>
              <div className="premium-container">
                <p className="premium-para">Premium</p>
                <p className="ultra-hd-btn">Ultra HD</p>
              </div>
            </div>
            <hr className="horizontal-line-3" />
            <div className="logout-btn-container">
              <button
                type="button"
                className="logout-btn"
                onClick={this.onLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <FooterSection />
      </>
    )
  }
}

export default Account
