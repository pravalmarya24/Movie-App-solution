import {Component} from 'react'
import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'

class SearchInput extends Component {
  state = {searchInputList: [], searchInput: ''}

  componentDidMount = () => {
    this.getSearchMovie()
  }

  getSearchMovie = async () => {
    const {searchInput} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
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

  renderSuccessView = () => {
    const {searchInputList, searchInput} = this.state
    // const filteredSearchResult = searchInputList.filter(each =>
    //   each.title.toLowerCase().includes(searchInput.toLowerCase()),
    // )
    return (
      <ul className="search-input-unlist">
        {searchInputList.map(each => (
          <li className="search-movie-list" key={each.id}>
            <img
              src={each.backdropPath}
              alt={each.title}
              className="search-movie-logo"
            />
          </li>
        ))}
      </ul>
    )
  }

  onSearchResult = event => this.setState({searchInput: event.target.value})

  onSearchInput = () => this.getSearchMovie()

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
                onChange={this.onSearchResult}
              />
              <button
                type="button"
                className="search-btn"
                testId="searchButton"
                onClick={this.onSearchInput}
              >
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
        {this.renderSuccessView()}
      </div>
    )
  }
}

export default SearchInput
