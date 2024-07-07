import {useState} from 'react'
import {Switch, Route} from 'react-router-dom'

import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieDetails from './components/MovieDetails'
import NotFound from './components/NotFound'
import SearchResults from './components/SearchResults'

import SearchContext from './context/SearchContext'

import './App.css'

const App = () => {
  const [searchInput, setSearchInput] = useState('')

  const setSearchInputContext = userSearchInput => {
    setSearchInput(userSearchInput)
  }

  return (
    <SearchContext.Provider
      value={{
        searchInputContext: searchInput,
        setSearchInputContext,
      }}
    >
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/search" component={SearchResults} />
        <Route exact path="/top-rated" component={TopRated} />
        <Route exact path="/upcoming" component={Upcoming} />
        <Route exact path="/movie/:id" component={MovieDetails} />
        <Route component={NotFound} />
      </Switch>
    </SearchContext.Provider>
  )
}

export default App
