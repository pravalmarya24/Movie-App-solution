import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'

const Header = () => (
  <nav className="movie-navbar-bg-container">
    <div className="movie-logo-container">
      <img
        src="https://res.cloudinary.com/dl88cshny/image/upload/v1679388794/Group_7399_ycynfv.png"
        alt="website logo"
        className="movie-logo-img"
      />
      <ul className="header-unordered-list-hp">
        <Link to="/">
          <li className="list-text">Home</li>
        </Link>
        <Link to="/popular">
          <li className="list-text">Popular</li>
        </Link>
      </ul>
    </div>
    <ul className="header-unordered-list-sp">
      <Link to="/search">
        <li className="list-icon-profile">
          <HiOutlineSearch className="search-icon" />
        </li>
      </Link>
      <Link to="/account">
        <li className="list-icon-profile">
          <img
            src="https://res.cloudinary.com/dl88cshny/image/upload/v1679389716/Mask_Group_t39tdj.png"
            alt="profile"
            className="profile-img"
          />
        </li>
      </Link>
    </ul>
  </nav>
)

export default Header
