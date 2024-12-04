import React from "react"
import Card from "../components/Card/Card"
import AppContext from "../contex"

function Profile({ onAddToFavorite, isLoading }) {
  const { favorites } = React.useContext(AppContext)


  return (
    <div className="content p-40">
      <div className="content__inner mb-40">
        <h1>Мои заказы</h1>
      </div>
      <div className="card">
        <ul className="card__list">
          {(isLoading ? [...Array(10)] : favorites).map((item, index) => (
            <Card
              key={index}
              isAddedToFavorite={true}
              onClickFavoriteButton={onAddToFavorite}
              loading={isLoading}
              {...item}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Profile