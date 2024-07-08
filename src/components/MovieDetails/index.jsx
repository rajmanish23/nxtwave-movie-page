import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import CastList from './CastList'
import Header from '../Header'
import Error from '../Error'

import './index.css'

const apiStatusConsts = {
  initial: 0,
  loading: 1,
  success: 2,
  failure: 3,
}

const MovieDetails = ({match}) => {
  const [movieData, setMovieData] = useState({})
  const [castData, setCastData] = useState({})
  const [posterImage, setPosterImage] = useState('')
  const [backdropImage, setBackdropImage] = useState('')
  const [apiStatus, setApiStatus] = useState(apiStatusConsts.initial)

  const getData = async () => {
    const {params} = match
    const {id} = params
    const movieDataUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=b3b1a441745f4448039e38effc347631&language=en-US`
    const castDataUrl = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=b3b1a441745f4448039e38effc347631&language=en-US`
    setApiStatus(apiStatusConsts.loading)
    const movieResponse = await fetch(movieDataUrl)
    const movieJsonData = await movieResponse.json()
    const castResponse = await fetch(castDataUrl)
    const castJsonData = await castResponse.json()
    if (movieResponse.ok && castResponse.ok) {
      const backdropImagePath = movieJsonData.backdrop_path
      const posterImagePath = movieJsonData.poster_path
      const backdropImageUrl = `https://image.tmdb.org/t/p/w500${backdropImagePath}`
      const posterImageUrl = `https://image.tmdb.org/t/p/w500${posterImagePath}`
      const releaseDateObj = new Date(movieJsonData.release_date)
      const updatedMovieData = {
        genres: movieJsonData.genres,
        title: movieJsonData.title,
        overview: movieJsonData.overview,
        releaseDate: releaseDateObj.toDateString(),
        runtime: movieJsonData.runtime,
        rating: movieJsonData.vote_average,
      }
      const {cast} = castJsonData
      const updatedCastData = cast.map(eachCast => ({
        profileImage: eachCast.profile_path,
        name: eachCast.name,
        id: eachCast.id,
        character: eachCast.character,
      }))
      setPosterImage(posterImageUrl)
      setBackdropImage(backdropImageUrl)
      setMovieData(updatedMovieData)
      setCastData(updatedCastData)
      setApiStatus(apiStatusConsts.success)
    } else {
      setApiStatus(apiStatusConsts.failure)
    }
  }

  const retry = () => getData()

  useEffect(() => {
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ececec" height={50} width={50} />
    </div>
  )

  const renderMovieDetails = () => (
    <>
      <div className="movie-details-overview-bg-container">
        <div className="movie-details-text-container">
          <div className="movie-details-top-container">
            <img
              className="movie-details-poster"
              src={posterImage}
              alt={`Poster for ${movieData.title}`}
            />
            <div className="movie-details-top-text-container">
              <h1 className="movie-details-title-heading">{movieData.title}</h1>
              <p className="movie-details-rating-para">
                {`Rating: ${movieData.rating.toFixed(1)}`}
              </p>
              <div className="movie-details-sub-details-container">
                <p className="movie-details-sub-details-text">{`${movieData.runtime} min`}</p>
                <p className="movie-details-sub-details-text">
                  {movieData.genres.map(eachGenre => `${eachGenre.name}, `)}
                </p>
              </div>
              <p className="movie-details-sub-details-para">
                {`Release Date: ${movieData.releaseDate}`}
              </p>
            </div>
          </div>
          <div className="movie-details-bottom-container">
            <h1 className="movie-details-overview-heading">Overview</h1>
            <p className="movie-details-overview-para">{movieData.overview}</p>
          </div>
        </div>
        <img
          className="movie-details-backdrop-image"
          src={backdropImage}
          alt={`Backdrop for ${movieData.title}`}
        />
      </div>
      <CastList castData={castData} />
    </>
  )

  let viewToRender = null
  switch (apiStatus) {
    case apiStatusConsts.loading:
      viewToRender = renderLoader()
      break
    case apiStatusConsts.success:
      viewToRender = renderMovieDetails()
      break
    case apiStatusConsts.failure:
      viewToRender = <Error retryFunc={retry} />
      break
    default:
      viewToRender = null
      break
  }

  return (
    <div className="global-bg-container">
      <Header />
      <div className="movie-details-bg-container">{viewToRender}</div>
    </div>
  )
}

export default MovieDetails
