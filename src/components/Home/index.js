import {Component} from 'react'
import './index.css'
import Header from '../Header'
import TrendingMovies from '../TrendingMovies'

class Home extends Component {
  render() {
    return (
      <div className="home-bg-container">
        <Header />
        <TrendingMovies />
      </div>
    )
  }
}

export default Home
