import {Link} from 'react-router-dom'

import './index.css'

const MovieList = ({movieData}) => (
  <ul className="movie-list-container">
    {movieData.map(eachCastObj => {
      const {posterImage, name, id, rating} = eachCastObj
      const posterImageUrl = `https://image.tmdb.org/t/p/w500${posterImage}`
      return (
        <Link to={`/movie/${id}`} key={id} className="movie-list-link">
          <li className="movie-list-item-container">
            <img
              className="movie-list-profile-image"
              src={posterImageUrl}
              alt={`Poster for ${name}`}
            />
            <p className="movie-list-detail-text">{name}</p>
            <p className="movie-list-detail-text">{`Rating: ${rating}`}</p>
          </li>
        </Link>
      )
    })}
  </ul>
)

export default MovieList
