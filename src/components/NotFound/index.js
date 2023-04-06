import './index.css'
import {withRouter, Link} from 'react-router-dom'

const NotFound = props => {
  const onReturnHomePage = () => {
    const {history} = props
    history.replace('/')
  }
  return (
    <div className="notfound-container">
      <h1 className="lost-your-way-heading">Lost Your Way ?</h1>
      <p className="notfound-para">
        we are sorry, the page you requested could not be found Please go back
        to the homepage.
      </p>
      <Link to="/">
        <button
          className="go-to-home-btn"
          type="button"
          onClick={onReturnHomePage}
        >
          Go to Home
        </button>
      </Link>
    </div>
  )
}

export default withRouter(NotFound)
