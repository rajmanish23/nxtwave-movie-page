import {useContext, useState} from 'react'
import {Link, Redirect} from 'react-router-dom'

import SearchContext from '../../context/SearchContext'

import './index.css'

const Header = () => {
  const {setSearchInputContext} = useContext(SearchContext)
  const [userSearchInput, setUserSearchInput] = useState('')

  const onChangeUpdateUserSearchInput = e => {
    setUserSearchInput(e.target.value)
  }

  const onClickSearch = () => {
    setSearchInputContext(userSearchInput)
    return <Redirect to="/search" />
  }

  return (
    <div className="header-bg-container">
      <Link to="/" className="header-nav-link">
        <h1 className="header-page-name">MovieDB</h1>
      </Link>
    </div>
  )
}

export default Header
