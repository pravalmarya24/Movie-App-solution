import {Component} from 'react'
import './index.css'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import TrendingMovies from '../TrendingMovies'
import OrignalsMovies from '../OrignalMovies'

const apiStatusObject = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  progress: 'PROGRESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    randomMovieList: [],
    apiStatus: apiStatusObject.initial,
  }

  componentDidMount = () => {
    this.getRandomBgPoster()
  }

  getRandomBgPoster = async () => {
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
    const randomIndex = Math.floor(Math.random() * 10)
    console.log(randomIndex)
    if (response.ok === true) {
      const OrignalMovieData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      console.log(OrignalMovieData)
      this.setState({
        randomMovieList: OrignalMovieData[randomIndex],
        apiStatus: apiStatusObject.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusObject.failure,
      })
    }
  }

  renderLoaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderSuccessView = () => {
    const {randomMovieList} = this.state
    console.log(randomMovieList)
    const {title, overview} = randomMovieList
    return (
      <div className="random-poster-container">
        <h1 className="title-heading">{title}</h1>
        <p className="overview-para">{overview}</p>
        <br />
        <button className="play-btn" type="button">
          Play
        </button>
      </div>
    )
  }

  onRecallMovieApi = () => this.getRandomBgPoster()

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
        onClick={this.onRecallMovieApi}
      >
        Try Again
      </button>
    </div>
  )

  renderViews = () => {
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
    const {randomMovieList} = this.state
    const {posterPath} = randomMovieList
    return (
      <>
        <div
          className="home-top-container"
          style={{
            backgroundImage: `url(${posterPath})`,
            backgroundSize: 'cover',
            width: '100%',
          }}
        >
          <Header />
          {this.renderViews()}
        </div>
        <div className="home-bottom-bg-container">
          <h1 className="trending-now-heading">Trending Now</h1>
          <TrendingMovies />
          <h1 className="orignal-heading">Orignals</h1>
          <OrignalsMovies />
        </div>
      </>
    )
  }
}

export default Home
