import {Link} from 'react-router-dom'

import Header from '../Header'

import NotFoundImage from '../../assets/no-results.png'

import './index.css'

const NotFound = () => (
  <div className="global-bg-container">
    <Header />
    <div className="not-found-bg-container">
      <img
        className="not-found-image"
        alt="Page Not Found"
        src={NotFoundImage}
      />
      <h1 className="not-found-heading">
        Seems like the page you were looking for does not exist...
      </h1>
      <p className="not-found-para">
        Please go back to the
        <Link className="not-found-home-link">Home page</Link>
        or enter a different URL in the address bar.
      </p>
    </div>
  </div>
)

export default NotFound
