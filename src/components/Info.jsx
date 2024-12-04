import React from 'react'
import AppContext from '../contex'

const Info = ({ image, title, description }) => {

  const { setCartOpened } = React.useContext(AppContext)

  return (
    <div className="cartEmpty">
      <img className="mb-20"  height={120} src={image} alt="Box" />
      <h2 className="mb-10">{title}</h2>
      <p className="mb-40">{description}</p>
      <button onClick={() => setCartOpened(false)} >
        <img src="./img/drawer/2.png" alt="" />
        Вернуться назад
      </button>
    </div>
  )
}

export default Info
