import errorImage from '../../assets/error.png'

import './index.css'

const Error = ({retryFunc}) => (
  <div className="error-bg-container">
    <img src={errorImage} alt="Server side error" className="error-image" />
    <h1 className="error-heading">Oops! Something went wrong</h1>
    <p className="error-paragraph">We are having some trouble...</p>
    <button type="button" onClick={retryFunc} className="error-button">
      Retry
    </button>
  </div>
)

export default Error
