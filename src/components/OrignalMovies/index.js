import {Component} from 'react'
import './index.css'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStatusObject = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class OrignalsMovies extends Component {
  state = {OrignalMovieList: [], apiStatus: apiStatusObject.initial}

  componentDidMount = () => {
    this.getOrignalsMovies()
  }

  getOrignalsMovies = async () => {
    this.setState({apiStatus: apiStatusObject.progress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const OrignalMovieData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        OrignalMovieList: OrignalMovieData,
        apiStatus: apiStatusObject.success,
      })
    } else {
      this.setState({apiStatus: apiStatusObject.failure})
    }
  }

  onRecallOrignalsMoviesApi = () => this.getOrignalsMovies()

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {OrignalMovieList} = this.state
    return (
      <Slider {...settings} className="slider-container">
        {OrignalMovieList.map(each => {
          const {backdropPath, id, title} = each
          return (
            <div className="logo-container" key={id}>
              <img
                src={backdropPath}
                alt={title}
                className="trending-movie-poster-logo"
              />
            </div>
          )
        })}
      </Slider>
    )
  }

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
        onClick={this.onRecallTrendingMovieApi}
      >
        Try Again
      </button>
    </div>
  )

  renderSlickViews = () => {
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
      <div className="trending-bg-container">{this.renderSlickViews()}</div>
    )
  }
}

export default OrignalsMovies
