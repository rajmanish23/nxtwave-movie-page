import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

import MovieList from '../MovieList'
import Header from '../Header'
import Error from '../Error'

import './index.css'

const apiStatusConsts = {
  initial: 0,
  loading: 1,
  success: 2,
  failure: 3,
}

const Home = () => {
  const [movieData, setMovieData] = useState([])
  const [pageNumber, setPageNumber] = useState(1)
  const [apiStatus, setApiStatus] = useState(apiStatusConsts.initial)

  const getData = async () => {
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=b3b1a441745f4448039e38effc347631&language=en-US&page=${pageNumber}`
    setApiStatus(apiStatusConsts.loading)
    const response = await fetch(apiUrl)
    const data = await response.json()
    if (response.ok) {
      const {results} = data
      const updatedData = results.map(eachObj => ({
        id: eachObj.id,
        name: eachObj.title,
        posterImage: eachObj.poster_path,
        rating: eachObj.vote_average,
      }))
      setMovieData(updatedData)
      setApiStatus(apiStatusConsts.success)
    } else {
      setApiStatus(apiStatusConsts.failure)
    }
  }

  const retry = () => getData()

  const prevPage = () => {
    setPageNumber(prev => prev - 1)
    getData()
  }

  const nextPage = () => {
    setPageNumber(prev => prev + 1)
    getData()
  }

  const renderMainView = () => (
    <>
      <h1 className="page-list-category-heading">Popular</h1>
      <MovieList movieData={movieData} />
      <div className="change-page-buttons-container">
        <div className="change-page-container">
          {pageNumber > 1 && (
            <button
              type="button"
              className="change-page-button"
              onClick={prevPage}
            >
              Previous
            </button>
          )}
        </div>
        <div className="change-page-container">
          {pageNumber < 501 && (
            <button
              type="button"
              className="change-page-button"
              onClick={nextPage}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </>
  )

  const renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ececec" height={50} width={50} />
    </div>
  )

  let viewToRender = null
  switch (apiStatus) {
    case apiStatusConsts.loading:
      viewToRender = renderLoader()
      break
    case apiStatusConsts.success:
      viewToRender = renderMainView()
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
      <div className="page-content-bg-container">{viewToRender}</div>
    </div>
  )
}

export default Home
