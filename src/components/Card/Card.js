import React, { Fragment } from "react";
import ContentLoader from "react-content-loader"
function Card({ id, name, imageUrl, price, onClickCardAddButton, onClickFavoriteButton, isAddedToFavorite = false, checkedBox = false, loading = false }) {
  // const OnClickButton = () => alert(props.price)

  const [isAdded, setInAdded] = React.useState(checkedBox)
  const onClickPlus = () => {
    onClickCardAddButton({ id, name, imageUrl, price })
    setInAdded(!isAdded)
  }

  const [isFavorite, setIsFaforite] = React.useState(isAddedToFavorite)
  const onClickFavorite = () => {
    onClickFavoriteButton({ id, name, imageUrl, price })
    setIsFaforite(!isFavorite)
  }

  return (
    <li className="card__item">
      {loading ? <ContentLoader
        speed={1.3}
        width={150}
        height={208}
        viewBox="0 -10 150 207"
        backgroundColor="#f3f3f3"
        foregroundColor="#e3e3e3"
      >
        <rect x="0" y="0" rx="10" ry="10" width="150" height="90" />
        <rect x="0" y="100" rx="4" ry="4" width="150" height="15" />
        <rect x="0" y="120" rx="4" ry="4" width="90" height="15" />
        <rect x="0" y="170" rx="8" ry="8" width="80" height="24" />
        <rect x="118" y="162" rx="8" ry="8" width="32" height="32" />
      </ContentLoader> :
        <Fragment>
          <div className="favorite">
            <img width={32} height={32} src={isFavorite ? "./img/mainblock/like.svg" : "./img/mainblock/1.svg"} alt="Unliked" onClick={onClickFavorite} />
          </div>
          <img width={133} height={112} src={imageUrl} alt="" />
          <p>{name}</p>
          <div className="card__info">
            <div className="card__info-desc">
              <span>Цена:</span>
              <b>{price} руб.</b>
            </div>

            <button className="card__info-button" onClick={onClickPlus}>
              <img
                src={isAdded ? "./img/mainblock/added.svg" : './img/mainblock/plus.svg'}
                alt="Plus"
              />
            </button>
          </div>
        </Fragment>
      }

    </li>
  );
}

// window.onload = () => {
//   const plusBnt = document.querySelector('#plus')
//   const minusBnt = document.querySelector('#minus')
//   const h1 = document.querySelector('h1')
//   const nulenie = document.querySelector('#nulenie')

//   let count = 4
//   h1.innerText = count

//   function render() {
//     h1.innerText = count
//     if (count > 0) {
//       minusBnt.removeAttribute('disabled')
//     } else {
//       minusBnt.setAttribute('disabled', '')
//     }
//   }
//   plusBnt.addEventListener('click', () => {
//     count++
//     render()
//   })

//   minusBnt.addEventListener('click', () => {
//     count--
//     render()
//   })

//   nulenie.addEventListener('click', () => {
//     count = count * 0
//     render()
//   })

// }

export default Card