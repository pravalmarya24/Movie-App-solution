import {Component} from 'react'
import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

class SearchInput extends Component {
  state = {searchInputList: []}

  componentDidMount = () => {
    this.getSearchMovie()
  }

  getSearchMovie = async () => {
    const url = 'https://apis.ccbp.in/movies-app/movies-search'
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      const searchMovieData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({searchInputList: searchMovieData})
    }
  }

  render() {
    return (
      <div className="search-bg-container">
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
          <div className="header-unordered-list-sp">
            <div className="search-input-container">
              <input
                type="search"
                className="input-element"
                placeholder="Search"
              />
              <button type="button" className="search-btn">
                <HiOutlineSearch className="search-icon-input-result" />
              </button>
            </div>
            <Link to="/account">
              <li className="list-icon-profile">
                <img
                  src="https://res.cloudinary.com/dl88cshny/image/upload/v1679389716/Mask_Group_t39tdj.png"
                  alt="profile"
                  className="profile-img"
                />
              </li>
            </Link>
          </div>
        </nav>
      </div>
    )
  }
}

export default SearchInput
