import React from "react"
import Card from "../components/Card/Card"
import AppContext from "../contex";

function FavoritesPage({ onAddToFavorite, isLoading }) {

  const { favorites } = React.useContext(AppContext)


  const renderFavorites = () => {
    return ((isLoading ? [...Array(10)] : favorites).map((item, index) => (
      <Card
        key={index}
        isAddedToFavorite={true}
        onClickFavoriteButton={onAddToFavorite}
        loading={isLoading}
        {...item}
      />
    )))
  }

  return (
    <div className="content p-40">
      <div className="content__inner mb-40">
        <h1>Мои закладки</h1>
      </div>
      <div className="card">
        <ul className="card__list">
          {renderFavorites()}
        </ul>
      </div>
    </div>
  )
}

export default FavoritesPage