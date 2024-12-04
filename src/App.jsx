import React from "react";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import axios from "axios";
import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home";
import FavoritesPage from "./pages/Faforite";
import AppContext from "./contex";
import Profile from "./pages/Profile";



function App() {
  const [items, setItems] = React.useState([])
  const [cartitems, setCartItems] = React.useState([])
  const [favorites, setFavorites] = React.useState([])
  const [searchSneakers, setSearchSneakers] = React.useState('')
  const [cartOpened, setCartOpened] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(true)



  React.useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get('https://67421923e4647499008fc7e7.mockapi.io/cart')
        const favoritesResponse = await axios.get('https://6744bf29b4e2e04abea37bdf.mockapi.io/favorites')
        const itemsResponse = await axios.get('https://67421923e4647499008fc7e7.mockapi.io/items')
        setIsLoading(false)
        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Неизвестная ошибка :(')
      }
    }

    fetchData()
  }, [])

  const onAddToCard = (obj) => { // метод 
    if (cartitems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://67421923e4647499008fc7e7.mockapi.io/cart/${obj.id}`)
      setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)))
    } else {
      axios.post('https://67421923e4647499008fc7e7.mockapi.io/cart', obj) // отправляем объекты в корзину и на сервер
      setCartItems((prev) => [...prev, obj])  // берем предыдущие данные и добавляем в конец новые 
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://67421923e4647499008fc7e7.mockapi.io/cart/${id}`)
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find(favobj => favobj.id === obj.id)) {
        axios.delete(`https://6744bf29b4e2e04abea37bdf.mockapi.io/favorites/${obj.id}`) // удаляем оьъекты из избранного
      } else {
        const { data } = await axios.post("https://6744bf29b4e2e04abea37bdf.mockapi.io/favorites", obj)
        setFavorites((prev) => [...prev, data])
      }
    } catch (error) {
      alert('Не удалось добавить в избранное')
    }
  }

  const onChangeSearch = (event) => {
    setSearchSneakers(event.target.value)
  }

  return (
    <AppContext.Provider value={{ cartitems, favorites, items, setCartOpened, setCartItems }}>
      <div className="wrapper clear">
        <Drawer items={cartitems} onCLoseDrawer={() => setCartOpened(false)} onRemove={onRemoveItem} opened={cartOpened} />
        <Header onClickCart={() => setCartOpened(true)} />
        <Routes>
          <Route path="/" element={
            <Home
              items={items}
              cartitems={cartitems}
              searchSneakers={searchSneakers}
              onChangeSearch={onChangeSearch}
              setSearchSneakers={setSearchSneakers}
              onAddToFavorite={onAddToFavorite}
              onAddToCard={onAddToCard}
              isLoading={isLoading}
            />
          }
          />
        </Routes>
        <Routes>
          <Route path="/favorites" element={
            <FavoritesPage onAddToFavorite={onAddToFavorite} isLoading={isLoading} />
          }
          />
        </Routes>
        <Routes>

          <Route path="/profile" element={
            <Profile onAddToFavorite={onAddToFavorite} isLoading={isLoading} />
          }
          />
        </Routes>
      </div >
    </AppContext.Provider>
  );
}

export default App;
