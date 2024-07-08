import './index.css'

const CastList = ({castData}) => (
  <div className="cast-list-bg-container">
    <h1 className="cast-list-heading">Cast</h1>
    <ul className="cast-list-container">
      {castData.map(eachCastObj => {
        const {profileImage, name, id, character} = eachCastObj
        const profileImageUrl = `https://image.tmdb.org/t/p/w500${profileImage}`
        return (
          <li className="cast-list-item-container" key={id}>
            <img
              className="cast-list-profile-image"
              src={profileImageUrl}
              alt={`Profile of ${name}`}
            />
            <p className="cast-list-detail-text">{name}</p>
            <p className="cast-list-detail-text">{`Character: ${character}`}</p>
          </li>
        )
      })}
    </ul>
  </div>
)

export default CastList
