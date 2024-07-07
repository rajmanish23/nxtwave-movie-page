import {useContext, useState} from 'react'
import {Link} from 'react-router-dom'

import {FaFire, FaStar, FaSearch} from 'react-icons/fa'
import {MdAccessTimeFilled} from 'react-icons/md'

import SearchContext from '../../context/SearchContext'

import './index.css'

const Header = ({history}) => {
  const {setSearchInputContext} = useContext(SearchContext)
  const [userSearchInput, setUserSearchInput] = useState('')

  const onChangeUpdateUserSearchInput = e => {
    setUserSearchInput(e.target.value)
  }

  const onClickSearch = () => {
    setSearchInputContext(userSearchInput)
    history.push('/search')
  }

  return (
    <div className="header-bg-container">
      <div className="header-bg-width-container">
        <Link to="/" className="header-nav-link">
          <h1 className="header-page-name">MovieDB</h1>
        </Link>

        <div className="header-desktop-right-container">
          <Link to="/" className="header-nav-link">
            <p className="header-nav-link-text">Popular</p>
          </Link>
          <Link to="/top-rated" className="header-nav-link">
            <p className="header-nav-link-text">Top Rated</p>
          </Link>
          <Link to="/upcoming" className="header-nav-link">
            <p className="header-nav-link-text">Upcoming</p>
          </Link>
          <div className="header-search-bar-container">
            <input
              type="text"
              className="header-search-input"
              placeholder="Movie Name"
              onChange={onChangeUpdateUserSearchInput}
              value={userSearchInput}
            />
            <button
              type="button"
              onClick={onClickSearch}
              className="header-search-button"
            >
              Search
            </button>
          </div>
        </div>

        <div className="header-mobile-right-container">
          <Link to="/" className="header-nav-link">
            <FaFire className="nav-link-icons" />
          </Link>
          <Link to="/top-rated" className="header-nav-link">
            <FaStar className="nav-link-icons" />
          </Link>
          <Link to="/upcoming" className="header-nav-link">
            <MdAccessTimeFilled className="nav-link-icons" />
          </Link>
          <Link to="/search" className="header-nav-link">
            <FaSearch className="nav-link-icons" />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
