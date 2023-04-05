import {Component} from 'react'
import './index.css'
import Cookies from 'js-cookie'
import Header from '../Header'

class MovieItemDetails extends Component {
  state = {
    movieDetailsList: [],
    genresList: [],
    similarMoviesList: [],
    spokenLanguagesList: [],
  }

  componentDidMount = () => {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
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
      const movieDetailsData = {
        adult: data.movie_details.adult,
        backdropPath: data.movie_details.backdrop_path,
        budget: data.movie_details.budget,
        id: data.movie_details.id,
        overview: data.movie_details.overview,
        posterPath: data.movie_details.poster_path,
        releaseDate: data.movie_details.release_date,
        runtime: data.movie_details.runtime,
        title: data.movie_details.title,
        voteAverage: data.movie_details.vote_average,
        voteCount: data.movie_details.vote_count,
      }

      const genresData = data.movie_details.genres.map(each => ({
        id: each.id,
        name: each.name,
      }))

      const similarMoviesData = data.movie_details.similar_movies.map(each => ({
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        id: each.id,
        title: each.title,
      }))

      const spokenLanguageData = data.movie_details.spoken_languages.map(
        each => ({
          englishName: each.english_name,
          id: each.id,
        }),
      )

      this.setState({
        movieDetailsList: movieDetailsData,
        genresList: genresData,
        spokenLanguagesList: spokenLanguageData,
        similarMoviesList: similarMoviesData,
      })
    }
  }

  renderMovieReviewAndPoster = () => {
    const {movieDetailsList} = this.state
    const {adult, runtime, title, overview, releaseDate} = movieDetailsList
    const hours = Math.ceil(runtime / 60) - 1
    const minutes = runtime % 60
    const date = new Date(releaseDate)
    const year = date.getFullYear()
    return (
      <div className="movie-review-container">
        <h1 className="movie-title-heading">{title}</h1>
        <div className="time-genre-date-container">
          <p className="runtime-para">{`${hours}h ${minutes}m`}</p>
          {adult ? <p className="adult">A</p> : <p className="adult">U/A</p>}
          <p className="year-para">{year}</p>
        </div>
        <p className="review-para">{overview}</p>
        <button className="play-btn" type="button">
          Play
        </button>
      </div>
    )
  }

  render() {
    const {movieDetailsList, genresList, spokenLanguagesList} = this.state
    const {
      backdropPath,
      voteAverage,
      voteCount,
      budget,
      releaseDate,
    } = movieDetailsList
    // const date = format(new Date(releaseDate), MMMM, dd, yyyy)
    // console.log(date)
    return (
      <div className="movie-item-details-bg-container">
        <Header />
        <div
          className="movie-detail-top-section"
          style={{
            backgroundImage: `url(${backdropPath})`,
            backgroundSize: 'cover',
            height: '100%',
          }}
        >
          {this.renderMovieReviewAndPoster()}
        </div>
        <div className="movie-details-container">
          <div className="unordered-genre-list-container">
            <ul className="genre-unlist">
              <p className="heading">Genres</p>
              {genresList.map(each => (
                <li className="genre-list" key={each.id}>
                  <p className="list-para">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="unordered-language-list-container">
            <ul className="genre-unlist">
              <p className="heading">Audio Available</p>
              {spokenLanguagesList.map(each => (
                <li className="genre-list" key={each.id}>
                  <p className="list-para">{each.englishName}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rating-container">
            <p className="heading">Rating Count</p>
            <p className="list-para">{voteCount}</p>
            <p className="heading">Rating Average</p>
            <p className="list-para">{voteAverage}</p>
          </div>
          <div className="budget-container">
            <p className="heading">Budget</p>
            <p className="list-para">{budget}</p>
            <p className="heading">Release Date</p>
            <p className="list-para">{releaseDate}</p>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieItemDetails
