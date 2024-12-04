import Card from "../components/Card/Card";

function Home({ items,
  cartitems,
  searchSneakers,
  onChangeSearch,
  setSearchSneakers,
  onAddToFavorite,
  onAddToCard,
  isLoading }) {

  const renderItems = () => {
    const filtredItems = items.filter((item) => item.name.toLowerCase().includes(searchSneakers.toLowerCase()))
    return (isLoading ? [...Array(30)] : filtredItems).map((item, index) => (
      <Card
        key={index}
        onClickFavoriteButton={(obj) => onAddToFavorite(obj)}
        // onClickFavorite={() => alert(item.name)}
        onClickCardAddButton={(obj) => onAddToCard(obj)}
        checkedBox={cartitems.some(obj => Number(obj.id) === Number(item.id))}
        loading={isLoading}
        {...item}
      />
    ))
  }

  return (
    <div className="content p-40">
      <div className="content__inner mb-40">
        <h1 className="contentH1 ">{searchSneakers ? `Поиск по запросу:  "${searchSneakers}"` : 'Все кросcовки'}</h1>
        <div className="search-block">
          <img src="./img/mainblock/Vector.svg" alt="Search" />
          <input onChange={onChangeSearch} value={searchSneakers} type="text" placeholder="Поиск..." />
          {searchSneakers && <img onClick={() => setSearchSneakers('')} className="remove-button" width={35} height={35} src="./img/mainblock/cross.svg" alt="Clear" />}
        </div>
      </div>
      <div className="card">
        <ul className="card__list">
          {renderItems()}
        </ul>
      </div>
    </div>
  )
}

export default Home