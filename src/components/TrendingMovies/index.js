import {Component} from 'react'
import './index.css'
import Slider from 'react-slick'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
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

class TrendingMovies extends Component {
  renderTrendingSlick = () => <Slider {...settings}></Slider>

  render() {
    return (
      <div>
        <h1>trending Slicks</h1>
      </div>
    )
  }
}

export default TrendingMovies
