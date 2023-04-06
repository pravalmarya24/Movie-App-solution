import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Header from '../Header'
import FooterSection from '../FooterSection'

const apiStatusObject = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class PopularMovies extends Component {
  state = {popularMovieList: [], apiStatus: apiStatusObject.initial}

  componentDidMount = () => {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({apiStatus: apiStatusObject.progress})
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
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
      const popularMovieData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        popularMovieList: popularMovieData,
        apiStatus: apiStatusObject.success,
      })
    } else {
      this.setState({apiStatus: apiStatusObject.failure})
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderPopularSuccessView = () => {
    const {popularMovieList} = this.state
    return (
      <ul className="popular-unList">
        {popularMovieList.map(each => (
          <Link to={`/movies/${each.id}`} key={each.id}>
            <li className="popular-list" key={each.id}>
              <img
                src={each.posterPath}
                alt={each.title}
                className="popular-movie-logo"
              />
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  onRecallPopularMoviesApi = () => this.getPopularMovies()

  renderPopularFailureView = () => (
    <div className="popular-failure-view">
      <img
        src="https://res.cloudinary.com/dl88cshny/image/upload/v1680508238/Background-Complete_j1q7om.png"
        alt="failure view"
        className="popular-failure-img"
      />
      <p className="popular-failure-para">
        Something went wrong. Please try again
      </p>
      <button
        className="try-again-btn"
        type="button"
        onClick={this.onRecallPopularMoviesApi}
      >
        Try Again
      </button>
    </div>
  )

  renderPopularMovieViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObject.progress:
        return this.renderLoaderView()
      case apiStatusObject.success:
        return this.renderPopularSuccessView()
      case apiStatusObject.failure:
        return this.renderPopularFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-bg-container">
        <Header />
        {this.renderPopularMovieViews()}
        {<FooterSection />}
      </div>
    )
  }
}

export default PopularMovies
