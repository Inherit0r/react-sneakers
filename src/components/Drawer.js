import AppContext from "../contex"
import Info from "./Info"
import React from "react"
import axios from "axios"

function Drawer({ onCLoseDrawer, items = [], onRemove, opened }) {

  const { cartItems, setCartItems } = React.useContext(AppContext)
  const [orderId, setOrderId] = React.useState(null)
  const [isCompleted, setIsCompleted] = React.useState(false)

  const { cartitems } = React.useContext(AppContext)
  const totalPrice = cartitems.reduce((sum, obj) => obj.price + sum, 0)


  const onClickOrder = async () => {

    const { data } = await axios.post("https://6744bf29b4e2e04abea37bdf.mockapi.io/orders", cartItems)
    try {
      setOrderId(data.id)
      setIsCompleted(true)
      setCartItems([])
    } catch (error) {
      alert('Не удалось оформить заказ :(')
    }
  }

  return (
    <div className={!opened ? "drawer" : "overlayVisibility"}>
      <div className="drawer__inner" >
        <div className="drawer__wrapper2">
          <div className="drawer__inner-top  mb-30">
            <h2>Корзина</h2>
            <button onClick={onCLoseDrawer}>
              <img width={35} height={35} src="./img/mainblock/cross.svg" alt="Close" />
            </button>
          </div>

          {items.length <= 0 &&
            <Info title={isCompleted ? "Заказ оформлен!" : "Корзина пустая"}
              description={isCompleted ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
              image={isCompleted ? "./img/drawer/order.png" : "./img/drawer/1.png"} />
          }

        </div>
        <div className="cart__wrapper">
          {items.map((obj) => (
            <div key={obj.id} className="cart mb-20">
              <div
                style={{ backgroundImage: `url(${obj.imageUrl})` }}
                className="cart__img mb-15"></div>
              <div className="cart__info">
                <p className="mb-10">{obj.name}</p>
                <b>{obj.price} руб.</b>
              </div>
              <button>
                <img onClick={() => onRemove(obj.id)} width={35} height={35} src="./img/mainblock/cross.svg" alt="Remove" />
              </button>
            </div>
          ))
          }
        </div>

        {items.length > 0 &&
          <div className="cart__footer">
            <ul className="cartTotalBlock">
              <li>
                <span>Итого: </span>
                <div></div>
                <b>{totalPrice} руб. </b>
              </li>
              <li>
                <span>Налог 5%: </span>
                <div></div>
                <b>{(Math.round(totalPrice * 0.05))} руб. </b>
              </li>
            </ul>
            <button onClick={onClickOrder} className="cart__button green-button" type="submit">Оформить заказ
              <img src="./img/mainblock/arrow.svg" alt="Arrow" />
            </button>
          </div>}

      </div>
    </div >)
}

export default Drawer