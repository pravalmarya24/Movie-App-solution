import {Component} from 'react'
import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const apiStatusObject = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class SearchInput extends Component {
  state = {
    searchInputList: [],
    searchInputResult: '',
    apiStatus: apiStatusObject.initial,
  }

  componentDidMount = () => {
    this.getSearchMovie()
  }

  getSearchMovie = async () => {
    this.setState({apiStatus: apiStatusObject.progress})
    const {searchInputResult} = this.state
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInputResult}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      const searchMovieData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        searchInputList: searchMovieData,
        apiStatus: apiStatusObject.success,
      })
    } else {
      this.set({apiStatus: apiStatusObject.failure})
    }
  }

  renderNoSearchResult = () => {
    const {searchInputResult} = this.state
    return (
      <div className="no-search-result-container">
        <img
          src="https://res.cloudinary.com/dl88cshny/image/upload/v1680676406/Group_fp9803.png"
          alt="no movies"
          className="no-search-found"
        />
        <p className="no-search-found-para">
          Your search for {searchInputResult} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {searchInputList} = this.state
    return (
      <>
        {searchInputList.length === 0 ? (
          this.renderNoSearchResult()
        ) : (
          <ul className="search-input-unlist">
            {searchInputList.map(each => (
              <Link to={`/movies/${each.id}`} key={each.id}>
                <li className="search-movie-list" key={each.id}>
                  <img
                    src={each.backdropPath}
                    alt={each.title}
                    className="search-movie-logo"
                  />
                </li>
              </Link>
            ))}
          </ul>
        )}
      </>
    )
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  onRecallSearchMovieApi = () => this.getSearchMovie()

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/dl88cshny/image/upload/v1680421245/Icon_nkfkre.png"
        alt="failure view"
        className="failure-logo"
      />
      <p className="failure-message-para">
        Something went wrong. Please try again
      </p>
      <button
        className="try-again-btn"
        type="button"
        onClick={this.onRecallSearchMovieApi}
      >
        Try Again
      </button>
    </div>
  )

  onSearchResult = event =>
    this.setState({searchInputResult: event.target.value})

  onSearchInput = () => this.getSearchMovie()

  renderSearchViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObject.success:
        return this.renderSuccessView()
      case apiStatusObject.progress:
        return this.renderLoaderView()
      case apiStatusObject.failure:
        return this.renderFailureView()
      default:
        return null
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
                onChange={this.onSearchResult}
              />
              <button
                type="button"
                className="search-btn"
                testid="searchButton"
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
        {this.renderSearchViews()}
      </div>
    )
  }
}

export default SearchInput
